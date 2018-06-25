import { Component, OnInit, ViewContainerRef ,ViewChild,ElementRef} from '@angular/core';
import { GroupchatsocketserviceService } from '../../groupchatsocketservice.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { GroupchatapiserviceService } from '../../groupchatapiservice.service';
import { ChatRoomManagementModule } from '../../chat-room-management/chat-room-management.module';
import * as $ from 'jquery';
//import { join } from 'path';

@Component({
  selector: 'app-inside-room',
  templateUrl: './inside-room.component.html',
  styleUrls: ['./inside-room.component.css'],
  providers : [GroupchatsocketserviceService]
})
export class InsideRoomComponent implements OnInit {
  
  @ViewChild('scrollMe', { read: ElementRef })
  @ViewChild('scrollMee', { read: ElementRef })

  public messageText;
  public authToken:any;
  public userInfo:any;
  public receiverId:any;
  public receiverName:any;
  public userList:any = [];
  public roomList:any = [];
  public disconnectedSocket:boolean;
  public roomName:any;
  public connectedRoom:any;
  public guyName:any;
  public flag:number;
  public scrollToChatTop:boolean= false;
  public loadingPreviousChat: boolean = false;
  public pageValue: number = 0;
  public messageList: any = [];
  public typingPersonName;
  public typingPersonNamee;
  public editRoom:any;
  public canEdit:number;

  constructor(public appService:GroupchatapiserviceService,public socketService:GroupchatsocketserviceService,public router:Router,public toastr:ToastsManager, vcr:ViewContainerRef) {
   this.receiverId=Cookie.get('receiverId');
   this.receiverName= Cookie.get('receiverName');
   this.toastr.setRootViewContainerRef(vcr); 
   this.typingPersonNamee="xyz";
   }

  ngOnInit() {
    this.authToken=Cookie.get('authToken');
    this.userInfo= this.appService.getUserInfoFromLocalStorage();
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getMessageFromUser();
    this.whoIsTyping();
    this.tellWhoIsTyping();
    this.getAvailableRooms();
    this.getOnlineUserList();
    this.refreshOnlineUser();
    this.refresh();
    this.editCompleted();
    this.leaveRoom();
    this.joinedRoom();
    this.messageText=JSON.stringify(undefined);
    this.canEdit=0;
  }

  public checkStatus : any =()=>{
    if(Cookie.get('authToken') === undefined || Cookie.get('authToken')==='' || Cookie.get('authToken')===null)
      {
        this.router.navigate(['/']);
        return false;
      }
    else
    {
      this.getAvailableRooms();
      return true;
    }
    
  }//end checkStatus

  public verifyUserConfirmation : any = () =>{
    //console.log("verifyuserconfirmationcalled")
    this.socketService.verifyUser().subscribe((data)=>{
     // console.log(data)
      this.disconnectedSocket=false;
      this.socketService.setUser(this.authToken);
      this.getOnlineUserList();
    });
    }

  public getOnlineUserList : any = () =>{
    //console.log("online userlist called")
    this.socketService.onlineUserList().subscribe((userList)=>{
    this.userList = [];
    for(let x in userList)
    {
      let temp = {'userId': userList[x].userId, 'name': userList[x].fullName, 'unread':0,'chatting':false};
      this.userList.push(temp);
    }
    //console.log(this.userList)
  });
  }

  public getAvailableRooms : any = () =>{
    this.socketService.availableRoom().subscribe((roomList) =>{
    this.roomList=roomList;
    //console.log(this.roomList)
  },
  error => {
    console.log("some error occurred");
    console.log(error.errormessage);
  });
  }

  public refreshOnlineUser(){
    this.socketService.refreshUserOfOnline();
  }


public connectToRoom : any = () =>{
  this.canEdit=1;
  this.socketService.connectToRoom(this.roomName);
  this.connectedRoom=this.roomName;
  this.messageList=[];
  this.refreshOnlineUser();
  this.refresh();
}

public refresh:any = () => {
  this.socketService.refreshList();
}

public changeRoom(changingRoom){
  this.canEdit=1;
  this.socketService.switchRoom(changingRoom);
  this.connectedRoom=changingRoom;
  this.messageList=[];
  this.refreshOnlineUser();
  this.refresh();
}

/*
public getChatValue(this.userInfo.userId){
  this.socketService.groupChat()
}
*/

public logout: any = () => {

  this.appService.logout()
    .subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
       // console.log("logout called")
        Cookie.delete('authToken');

        Cookie.delete('receiverId');

        Cookie.delete('receiverName');

        this.socketService.exitSocket()

        this.router.navigate(['/']);

      } else {
        this.toastr.error(apiResponse.message)

      } // end condition

    }, (err) => {
      this.toastr.error('some error occured')


    });
    this.refreshOnlineUser();
    this.refresh();
} // end logout

public sendMessage: any = () => {

  if(this.messageText){

    let message = {
      senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
      senderId: this.userInfo.userId,
      receiverName: Cookie.get('receiverName'),
      receiverId: Cookie.get('receiverId'),
      message: this.messageText,
      createdOn: new Date()
    } // end chatMsgObject
   // console.log(message);
    this.socketService.sendChatMessage(message)
    this.pushToChatWindow(message) 

  }
  else{
    this.toastr.warning('text message can not be empty')

  }

} // end sendMessage


public getMessageFromUser:any=()=>{
    this.socketService.chatByUserId().subscribe((data)=>{
      this.messageList.push(data);
      this.toastr.success(`${data.senderName} says ${data.message}`);
     // console.log(`${data.senderName} says ${data.message}`);
      this.scrollToChatTop=false;
    })
  }

public whoIsTyping=()=>{
  $('#typingPerson').on("keydown",()=>{
    this.flag=1;
    this.guyName=this.userInfo.firstName;
    let objForType = { flag : this.flag, guyName:this.guyName}
    //console.log(objForType);
    this.socketService.personTyping(objForType);
  });
  $('#typingPerson').on("keyup",()=>{
    this.flag=0;
    this.guyName=this.userInfo.firstName;
    let objForType = { flag : this.flag, guyName:this.guyName}
    //console.log(this.flag);
    this.socketService.personTyping(objForType);
  });
}

public tellWhoIsTyping=()=>{
  this.socketService.checkIfAnyoneIsTyping().subscribe((guy)=>{    
    if(guy.flag==1){
      this.typingPersonNamee="";
      this.typingPersonName=guy.guyName;
    }
    else{
      this.typingPersonName="";
      if(this.typingPersonName === "")
      this.typingPersonNamee="xyz";
    }    
  })
}

public loadEarlierPageOfChat:any=()=>{
  this.loadingPreviousChat=true;
  this.pageValue++;
  this.scrollToChatTop=true;
  this.getPreviousChatOfRoom();
}

public getPreviousChatOfRoom=()=>{
  let previousData = (this.messageList.length > 0 ? this.messageList.slice():[])
  this.socketService.getChat(this.connectedRoom,this.pageValue*10).subscribe((apiResponse)=>{
        //console.log(apiResponse);
        if(apiResponse.status == 200){
          this.messageList=apiResponse.data.concat(previousData);
        }
        else{
          this.messageList=previousData;
          this.toastr.warning("No messages available");
        }
        this.loadingPreviousChat=false;
  },
  (err)=>{
    this.toastr.error("some error occurred");
  });  
}

public pushToChatWindow  = (data) =>{
  this.messageText = "";
  this.messageList.push(data);
  this.scrollToChatTop = false;
}

public sendMessageUsingKeyPress = (event:any) =>{

  if(event.keyCode === 13)
  {
    this.sendMessage();
  }
}

public editToRoom = () =>{
  let editRoomObj = {currentRoomName:this.connectedRoom, newRoom:this.editRoom};
 // console.log(editRoomObj);
  this.changeRoom(editRoomObj.newRoom);
  this.refreshOnlineUser();
  this.refresh();
  this.socketService.editRoomName(editRoomObj);
  
}

public editCompleted = () =>{
  this.socketService.editingDone().subscribe((editedObj)=>{
   // console.log(this.connectedRoom);
   // console.log(editedObj);
    if(this.connectedRoom == editedObj.currentRoomName)
        {
        this.changeRoom(editedObj.newRoom);
      }
  })
this.refreshOnlineUser();
this.refresh();
}

public leaveRoom = () =>{
  this.socketService.leftTheRoom().subscribe((nameOfPerson)=>{
    this.toastr.info(`${nameOfPerson} left :(`);
  })
}

public joinedRoom = () =>{
  this.socketService.joinedTheRoom().subscribe((nameOfPerson)=>{
    this.toastr.info(`${nameOfPerson} joined :)`);
  })
}

}