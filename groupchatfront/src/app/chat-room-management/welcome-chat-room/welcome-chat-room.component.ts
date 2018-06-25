import { Component, OnInit } from '@angular/core';
import { GroupchatapiserviceService } from '../../groupchatapiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-chat-room',
  templateUrl: './welcome-chat-room.component.html',
  styleUrls: ['./welcome-chat-room.component.css']
})
export class WelcomeChatRoomComponent implements OnInit {

  constructor(private groupChatService:GroupchatapiserviceService, private routers:Router) { }
  ngOnInit() {
  }

  public createChatRoom(){
    this.routers.navigate(['/create-room'])
  }

  public joinChatRoom(){
    this.routers.navigate(['/inside-room'])
  }
}
