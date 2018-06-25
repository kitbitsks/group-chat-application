import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeChatRoomComponent } from './welcome-chat-room.component';

describe('WelcomeChatRoomComponent', () => {
  let component: WelcomeChatRoomComponent;
  let fixture: ComponentFixture<WelcomeChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
