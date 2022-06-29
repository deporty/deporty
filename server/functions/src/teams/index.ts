import * as cors from 'cors';
import * as express from "express";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { DataSource } from "../core/datasource";
import { FirebaseDataSource } from "../core/firebase.datasource";
import { TeamController } from "./infrastructure/team.controller";
import { DEPENDENCIES_CONTAINER } from "./modules.config";
import { TeamsModulesConfig } from "./teams-modules.config";


const db: Firestore = getFirestore();
export function configDependencies() {
  DEPENDENCIES_CONTAINER.addValue({
    id: "FirebaseDatabase",
    value: db,
  });

  DEPENDENCIES_CONTAINER.add({
    id: "DataSource",
    kind: DataSource,
    strategy: "singleton",
    dependencies: ["FirebaseDatabase"],
    override: FirebaseDataSource,
  });

  TeamsModulesConfig.config(DEPENDENCIES_CONTAINER);
}

export const app = express();
app.use(cors())
configDependencies();
TeamController.registerEntryPoints(app);
