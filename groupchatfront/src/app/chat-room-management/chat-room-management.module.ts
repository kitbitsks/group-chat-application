import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeChatRoomComponent } from './welcome-chat-room/welcome-chat-room.component';
import { CreateChatRoomComponent } from './create-chat-room/create-chat-room.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinChatRoomModule } from '../join-chat-room/join-chat-room.module';
import { InsideRoomComponent } from '../join-chat-room/inside-room/inside-room.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JoinChatRoomModule,
    RouterModule.forChild([
      {path:'create-room',component:CreateChatRoomComponent},
      {path:'inside-room', component:InsideRoomComponent}
    ])
  ],
  declarations: [WelcomeChatRoomComponent, CreateChatRoomComponent],
  exports:[WelcomeChatRoomComponent,CreateChatRoomComponent]
})
export class ChatRoomManagementModule { }
