import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observer} from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams} from '@angular/common/http';
import { GroupchatapiserviceService } from './groupchatapiservice.service';

@Injectable()
export class GroupchatsocketserviceService {

  private url = "http://localhost:3000/";
  private socket;
  constructor(private http:HttpClient) {
    //connection is being created, handshake is happening
    this.socket=io(this.url);
   }

   //events to be listened
   public verifyUser=()=>{

    return Observable.create((observer)=>{
      
      this.socket.on('verifyUser',(data)=>{
        observer.next(data);
      });// end Socket
    });//end Observable
   }//end verifyUser

   public onlineUserList=()=>{

    return Observable.create((observer)=>{
      this.socket.on('online-user-list',(userList)=>{
        observer.next(userList);
      });// end Socket
    });//end Observable
   }//end onlineUserList

   
   public disconnectedSocket=()=>{

    return Observable.create((observer)=>{
      this.socket.on('disconnect',()=>{
        observer.next();
      });// end Socket
    });//end Observable
   }//end disconnectedSocket


  public availableRoom=()=>{
    return Observable.create((observer)=>{
      this.socket.on('roomsare',(roomList)=>{
        observer.next(roomList)
      })
    })
  }//list of available rooms

  public groupChat=(userId)=>{
  return Observable.create((observer)=>{
    this.socket.on(userId, (data) => {
      //console.log("you received a message from "+data.senderName)
      //console.log(data.message)
      observer.next(data);
    });
  })
    
  }

  public chatByUserId = ()=>{
    return Observable.create((observer)=>{
      this.socket.on('msg-recieved',(data)=>{
        observer.next(data);
      });
    });
  }//receiving message

  public checkIfAnyoneIsTyping = () =>{
    return Observable.create((observer)=>{
      this.socket.on('typing',(nameOfGuy)=>{
        observer.next(nameOfGuy);
      });
    });
  }//receiving the name of guy who is typing

  public editingDone = () =>{
    return Observable.create((observer)=>{
      this.socket.on('roomNameEdited',(editObj)=>{
        observer.next(editObj);
      });
    });
  }//recieve the edited value

  public leftTheRoom = () =>{
      return Observable.create((observer)=>{
        this.socket.on('leftRoom',(leavingPerson)=>{
          observer.next(leavingPerson);
        });
      });  
    }//leaving the room notification

  public joinedTheRoom = () =>{
      return Observable.create((observer)=>{
        this.socket.on('joinedRoom',(joiningPerson)=>{
          observer.next(joiningPerson);
          });
        });
  }//joining the room notification



  public getChat(nameOfRoom, skip): Observable<any> {

    return this.http.get(`${this.url}api/v1/chat/get/for/group?skip=${skip}&chatRoom=${nameOfRoom}&authToken=${Cookie.get('authToken')}`)
      .do(data => console.log('Data Received'));
  }
  
  //events to be emitted
   public setUser = (authToken) =>{
     this.socket.emit('set-user', authToken);
   }//end setUser
  
   public connectToRoom=(chatRoom)=>{
     console.log(chatRoom)
    this.socket.emit('create-room',chatRoom);
 }//end connectToRoom

  public refreshList=()=>{
    this.socket.emit('onRefresh');
  }//end connectToRoom

  public switchRoom=(switchTo)=>{
    this.socket.emit('switch-room',switchTo)
  }//end switch-room

  public refreshUserOfOnline(){
    this.socket.emit('onRefreshOnline');
  }//refreshing the online userList

  public exitSocket = () =>{
    this.socket.disconnect();
  }// end exit socket

  public sendChatMessage = (chatMsgObject) => {
    this.socket.emit('chat-msg', chatMsgObject);
  } // end getChatMessage

  public personTyping=(personTypingName) =>{
    this.socket.emit('typing',personTypingName)
  }//emitting the identity of typing person

  public editRoomName=(newRoomName) =>{
    this.socket.emit('editRoom',newRoomName);
  }//emitting the edited room value

   public handleError(err: HttpErrorResponse){
     let errorMessage = '';
     if(err.error instanceof Error){
       errorMessage=`An error occurred: ${err.error.message}`;
      } 
      else { 
       errorMessage=`Server returned code: ${err.status}, error message is : ${err.error.message}`;
          }//endcondition *if
      console.error(errorMessage);
      return Observable.throw;
     }//end HandleError

  
}
