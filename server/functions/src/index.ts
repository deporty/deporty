import { cert, initializeApp } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import { getStorage, Storage } from 'firebase-admin/storage';
import { Container } from './core/DI';

import { main as PlayerFunction } from './players';
import { main as TeamFunction } from './teams';
import { main as TournamentFunction } from './tournaments';
import { FirebaseDataSource } from './core/firebase.datasource';
import { DataSource } from './core/datasource';
import { FileAdapter } from './core/file/file.adapter';
import { FileRepository } from './core/file/file.repository';
import { env } from './environments/env';

const firebaseApp = initializeApp({
  credential: cert(env.credentials),
  storageBucket: env.bucketName,
});

const db: Firestore = getFirestore(firebaseApp);
db.settings({ ignoreUndefinedProperties: true });

const storage: Storage = getStorage(firebaseApp);

const DEPENDENCIES_CONTAINER = new Container();

DEPENDENCIES_CONTAINER.addValue({
  id: 'FirebaseDatabase',
  value: db,
});

DEPENDENCIES_CONTAINER.addValue({
  id: 'FirebaseStorage',
  value: storage,
});

DEPENDENCIES_CONTAINER.add({
  id: 'DataSource',
  kind: DataSource,
  strategy: 'singleton',
  dependencies: ['FirebaseDatabase'],
  override: FirebaseDataSource,
});

DEPENDENCIES_CONTAINER.add({
  id: 'FileAdapter',
  kind: FileAdapter,
  strategy: 'singleton',
  dependencies: ['FirebaseStorage'],
  override: FileRepository,
});
const playerConfig = PlayerFunction(DEPENDENCIES_CONTAINER);
const teamConfig = TeamFunction(DEPENDENCIES_CONTAINER);
const tournamentConfig = TournamentFunction(DEPENDENCIES_CONTAINER);

DEPENDENCIES_CONTAINER.resolvePendings();
playerConfig.controller(playerConfig.app, DEPENDENCIES_CONTAINER);
teamConfig.controller(teamConfig.app, DEPENDENCIES_CONTAINER);
tournamentConfig.controller(tournamentConfig.app, DEPENDENCIES_CONTAINER);

exports.players = functions.https.onRequest(playerConfig.app);

exports.teams = functions.https.onRequest(teamConfig.app);

exports.tournaments = functions.https.onRequest(tournamentConfig.app);
