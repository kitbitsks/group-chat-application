import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GroupchatapiserviceService } from '../../groupchatapiservice.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { JoinChatRoomModule } from '../../join-chat-room/join-chat-room.module';
import { ChatRoomManagementModule } from '../../chat-room-management/chat-room-management.module';
import { CreateChatRoomComponent } from '../../chat-room-management/create-chat-room/create-chat-room.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:any;
  public password:any;

  constructor(public appService:GroupchatapiserviceService,public router:Router,public toastr:ToastsManager, vcr:ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  public goToSignUp: any = () =>{
    this.router.navigate(['/sign-up']);
  }//endtoSignUp

  public goToForgotPswd: any = () =>{
    this.router.navigate(['/verify-email']);
  }//endtoSignUp

  public signinFunction: any = () =>{
    if(!this.email){
      this.toastr.warning('Please Enter Email !');
    }
    else if(!this.password){
      this.toastr.warning('Please Enter Password !');
    }
    else{
      let data={
        email:this.email,
        password:this.password
      }

      this.appService.signinFunction(data).subscribe((apiResponse)=>{

        if(apiResponse.status=200){
          console.log(apiResponse)

          Cookie.set('authToken',apiResponse.data.authToken);

          Cookie.set('receiverId',apiResponse.data.userDetails.userId);
          
          Cookie.set('receiverName',apiResponse.data.userDetails.firstName);

          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);

          this.toastr.success("Log In Successfull")

          setTimeout(() => {
            this.router.navigate(['/welcome-chat-room']);
            
          }, 3000);

//          this.router.navigate(['/chat']);
        }

        else{
          this.toastr.error(apiResponse.message)
        }
      },
        (err)=>{
          this.toastr.error('Invalid Email / Password');
      });
    }
  }
}
