import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { ChatService } from '../../services/chat.service';
import { Unsubscribe } from 'src/modules/shared/classes/unsubscribe';
import { Message } from 'src/modules/shared/models/message.model';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss']
})
export class ChatComponent extends Unsubscribe implements OnInit {

  public message: string;
  public messages: Message[];

  constructor(
    private chatService: ChatService,
    private fireStore: AngularFirestore,
    private authService: AuthService,
    private messaging: AngularFireMessaging
  ) {
    super();
  }
  
  ngOnInit() {
    this.subscribeToMessages();
    this.getDeviceToken();
  }

  public sendMessage(): void {
    if (this.message) {
      this.chatService.sendMessage(this.message);
      this.clearMessage();
    }
  }

  public clearMessage(): void {
    this.message = '';
  }

  public trackByFn(index: number, message: Message): string {
    return message.id;
  }

  public signOut(): void {
    this.authService.signOut();
  }

  private subscribeToMessages(): void {
    this.subscribeTo = this.fireStore.collection('messages').valueChanges()
      .subscribe((messages: Message[]) => this.messages = messages);
  }

  private getDeviceToken(): void {
    this.subscribeTo = this.messaging.requestToken
      .subscribe(token => this.chatService.setDeviceToken(token));
  }

}
