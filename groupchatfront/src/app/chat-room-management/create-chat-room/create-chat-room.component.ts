import { Component, OnInit } from '@angular/core';
import { GroupchatsocketserviceService } from '../../groupchatsocketservice.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupchatapiserviceService } from '../../groupchatapiservice.service';

@Component({
  selector: 'app-create-chat-room',
  templateUrl: './create-chat-room.component.html',
  styleUrls: ['./create-chat-room.component.css'],
})
export class CreateChatRoomComponent implements OnInit {

  
public nameOfRoom : any;
  constructor(private chatService:GroupchatapiserviceService,private router:Router) { }

  ngOnInit() {
  }

  public proceedToRoom():any{
    this.chatService.chatRoomName=this.nameOfRoom
    console.log(this.nameOfRoom);
    console.log(this.chatService.chatRoomName);
    this.router.navigate(['/inside-room'])
  }
}
