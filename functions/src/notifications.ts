import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { EventContext } from 'firebase-functions';
import { firestore, messaging } from 'firebase-admin';

import { User } from './models/user.model';
import { Message } from './models/message.model';

export const notifications = async (snapshot: DocumentSnapshot, context: EventContext) => {
  const users = await firestore().collection('users').get();

  users.forEach(async (userSnapshot: DocumentSnapshot) => {
    const user: User = userSnapshot.data() as User;
    const message: Message = snapshot.data() as Message;

    if (user.isOnline) {
      await messaging().sendToDevice(user.deviceToken, {
        notification: {
          title: 'New Message',
          body: message.content,
          icon: 'favicon.ico',
          clickAction: 'http://localhost:4200/',
        }
      });
    }
  });
}