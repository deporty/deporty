import { cert, initializeApp } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

const firebaseApp = initializeApp({
  credential: cert('./deporty-dev-firebase-adminsdk.json'),
  storageBucket: 'deporty-dev.appspot.com',
});

const db: Firestore = getFirestore(firebaseApp);
db.settings({ ignoreUndefinedProperties: true });

import { main as PlayerFunction } from './players';
import { main as TeamFunction } from './teams';
import { main as TournamentFunction } from './tournaments';

exports.players = functions.https.onRequest(PlayerFunction(firebaseApp, db));
exports.teams = functions.https.onRequest(TeamFunction(firebaseApp, db));
exports.tournaments = functions.https.onRequest(
  TournamentFunction(firebaseApp, db)
);
