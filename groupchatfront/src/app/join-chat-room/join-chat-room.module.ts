import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsideRoomComponent } from './inside-room/inside-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatRoomManagementModule } from '../chat-room-management/chat-room-management.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [InsideRoomComponent],
  exports:[InsideRoomComponent]
})
export class JoinChatRoomModule { }
