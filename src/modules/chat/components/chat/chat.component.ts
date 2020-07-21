import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { ChatService } from '../../services/chat.service';
import { Unsubscribe } from 'src/modules/shared/classes/unsubscribe.class';
import { Message } from 'src/modules/shared/models/message.model';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { User } from 'src/modules/shared/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss']
})
export class ChatComponent extends Unsubscribe implements OnInit {

  public message: string;
  public messages: Message[];
  public onlineUsers: User[];
  public preview: string;

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
    this.subscribeToOnlineUsers();
    this.getDeviceToken();
  }

  public removeAttachment(): void {
    this.preview = null;
  }

  public reactOnPaste(event: ClipboardEvent): void {
    var item = event.clipboardData.items[0];
     
      if (item.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        const reader = new FileReader();

        reader.onload = () => {
          this.preview = <any>reader.result;
        }
        reader.readAsDataURL(file);
      }
  }

  public sendMessage(): void {
    if (this.message || this.preview) {
      this.chatService.sendMessage(this.message, this.preview);
      this.clearMessage();
    }
  }

  public clearMessage(): void {
    this.message = null;
    this.preview = null;
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

  private subscribeToOnlineUsers(): void {
    this.subscribeTo = this.fireStore.collection('users').valueChanges()
      .subscribe((users: User[]) => this.onlineUsers = users.filter(user => user.isOnline));
  }

  private getDeviceToken(): void {
    this.subscribeTo = this.messaging.requestToken
      .subscribe(token => this.chatService.setDeviceToken(token));
  }

}
