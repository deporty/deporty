import * as cors from 'cors';
import * as express from 'express';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { Storage, getStorage } from 'firebase-admin/storage';
import { DataSource } from '../core/datasource';
import { FileAdapter } from '../core/file/file.adapter';
import { FileRepository } from '../core/file/file.repository';
import { FirebaseDataSource } from '../core/firebase.datasource';
import { TournamentController } from './infrastructure/tournament.controller';
import { DEPENDENCIES_CONTAINER } from './modules.config';
import { TournamentsModulesConfig } from './tournaments-modules.config';

export function main(firebaseApp: any) {
  const app = express();
  app.use(cors());

  const db: Firestore = getFirestore(firebaseApp);

  const storage: Storage = getStorage(firebaseApp);

  function configDependencies() {
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

    TournamentsModulesConfig.config(DEPENDENCIES_CONTAINER);
  }

  configDependencies();
  TournamentController.registerEntryPoints(app);
  return app;
}
