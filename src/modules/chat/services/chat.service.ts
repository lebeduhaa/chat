import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { SharedDataService } from 'src/modules/shared/services/shared-data.service';
import { SubjectService } from 'src/modules/shared/services/subject.service';
import { Message } from 'src/modules/shared/models/message.model';
import { Service } from 'src/modules/shared/classes/service.class';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Service {

  constructor(
    protected subjectService: SubjectService,
    private fireStore: AngularFirestore,
    private sharedDataService: SharedDataService,
    private fireStorage: AngularFireStorage
  ) {
    super(subjectService);
  }

  public async sendMessage(content: string, base64: string): Promise<void> {
    const id = new Date().valueOf();
    const message: Message = {
      id: String(id),
      content,
      user: this.sharedDataService.userData
    }

    if (base64) {
      const pureBase64 = base64.slice(base64.indexOf('base64,') + 7);

      this.showSpinner();
      const uploadResult = await this.fireStorage.ref(`attachments/${id}.jpg`).putString(pureBase64, 'base64');
      message.attachment = await uploadResult.ref.getDownloadURL();
    }
    
    await this.fireStore.collection('messages').doc(String(id)).set(message);
    this.hideSpinner();
  }

  public async setDeviceToken(deviceToken: string): Promise<void> {
    await this.fireStore.collection('users').doc(this.sharedDataService.userData.id).update({
      deviceToken
    });
  }

}
