import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { SharedDataService } from 'src/modules/shared/services/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private fireStore: AngularFirestore,
    private sharedDataService: SharedDataService,
    private angularFireStore: AngularFirestore
  ) {}

  public async sendMessage(message: string): Promise<void> {
    const id = new Date().valueOf();

    await this.fireStore.collection('messages').doc(String(id)).set({
      id,
      content: message,
      user: this.sharedDataService.userData
    });
  }

  public async setDeviceToken(deviceToken: string): Promise<void> {
    await this.fireStore.collection('users').doc(this.sharedDataService.userData.id).update({
      deviceToken
    });
  }

}
