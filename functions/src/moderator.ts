import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

import { EventContext } from 'firebase-functions';
import { BAD_WORDS } from './constants/bad-words';
import { Message } from './models/message.model';

export const badWordsCatcher = async (snapshot: DocumentSnapshot, context: EventContext) => {
  const message: Message = snapshot.data() as Message;
  const words: string[] = message.content.split(' ');
  const newMessageContent: string = words.map((word: string) => {
    if (BAD_WORDS.some((badWord: string) => word.includes(badWord))) {
      return new Array(word.length).fill('*').join('');
    }

    return word;
  }).join(' ');

  await snapshot.ref.update({
    content: newMessageContent
  });
}
