import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from  '@angular/router';
import { SendResetCodeToMailComponent } from './send-reset-code-to-mail/send-reset-code-to-mail.component';
import { ChatRoomManagementModule } from '../chat-room-management/chat-room-management.module';
import { WelcomeChatRoomComponent } from '../chat-room-management/welcome-chat-room/welcome-chat-room.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'sign-up', component:SignUpComponent},
      {path:'fgtPswd',component:ForgotPasswordComponent},
      {path:'verify-email',component:SendResetCodeToMailComponent},
      {path:'welcome-chat-room', component:WelcomeChatRoomComponent}]),
    ChatRoomManagementModule
  ],
  declarations: [LoginComponent, SignUpComponent, ForgotPasswordComponent, SendResetCodeToMailComponent]
})
export class UserManagementModule { }
