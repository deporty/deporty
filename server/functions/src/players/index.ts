import * as cors from 'cors';
import * as express from 'express';
import { Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';
import { DataSource } from '../core/datasource';
import { FileAdapter } from '../core/file/file.adapter';
import { FileRepository } from '../core/file/file.repository';
import { FirebaseDataSource } from '../core/firebase.datasource';
import { PlayerController } from './infrastructure/player.controller';
import { DEPENDENCIES_CONTAINER } from './modules.config';
import { PlayersModulesConfig } from './players-modules.config';

export function main(firebaseApp: any, db: Firestore) {
  const app = express();
  app.use(cors());

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

    PlayersModulesConfig.config(DEPENDENCIES_CONTAINER);
  }

  configDependencies();
  PlayerController.registerEntryPoints(app);
  return app;
}
