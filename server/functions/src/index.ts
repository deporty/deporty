import { cert, initializeApp } from 'firebase-admin/app';
import * as functions from 'firebase-functions';

initializeApp({
  credential: cert('./deporty-dev-firebase-adminsdk.json'),
});
import { app as PlayerFunction } from './players';

exports.players = functions.https.onRequest(PlayerFunction);
