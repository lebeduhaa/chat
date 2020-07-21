import * as functions from 'firebase-functions';
import { initializeApp, credential } from 'firebase-admin';

import { badWordsCatcher } from './moderator';
import { notifications } from './notifications';

const serviceAccount = require('./service-account.json');

initializeApp({
  credential: credential.cert(serviceAccount),
  storageBucket: 'gisfit-production.appspot.com'
});

export const moderator = functions.firestore.document('messages/{id}').onCreate(badWordsCatcher);
export const sendNotifications = functions.firestore.document('messages/{id}').onCreate(notifications);
