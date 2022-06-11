import * as express from "express";
import { cert, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { FirebaseDataSource } from "./core/firebase.datasource";
import { DEPENDENCIES_CONTAINER } from "./modules.config";
import { PlayerController } from "./players/player.controller";
import { PlayersModulesConfig } from "./players/players-modules.config";
import { DataSource } from "./core/datasource";
initializeApp({
  credential: cert("./deporty-dev-firebase-adminsdk.json"),
});

const db: Firestore = getFirestore();

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

PlayersModulesConfig.config(DEPENDENCIES_CONTAINER);

export const app = express();

PlayerController.registerEntryPoints(app);

exports.app = functions.https.onRequest(app);
