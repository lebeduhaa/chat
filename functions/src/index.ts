import * as functions from 'firebase-functions';

import { badWordsCatcher } from './moderator';
import { notifications } from './notifications';

export const moderator = functions.firestore.document('messages/{id}').onCreate(badWordsCatcher);
export const sendNotifications = functions.firestore.document('messages/{id}').onCreate(notifications);
