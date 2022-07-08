import { cert, initializeApp } from 'firebase-admin/app';
import * as functions from 'firebase-functions';

const firebaseApp = initializeApp({
  credential: cert('./deporty-dev-firebase-adminsdk.json'),
  storageBucket: 'deporty-dev.appspot.com',
});
import { main as PlayerFunction } from './players';
import { app as TeamFunction } from './teams';
import { main as TournamentFunction } from './tournaments';

exports.players = functions.https.onRequest(PlayerFunction(firebaseApp));
exports.teams = functions.https.onRequest(TeamFunction);
exports.tournaments = functions.https.onRequest(
  TournamentFunction(firebaseApp)
);
