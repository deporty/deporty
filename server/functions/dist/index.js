"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const functions = require("firebase-functions");
const firebase_datasource_1 = require("./core/firebase.datasource");
const modules_config_1 = require("./modules.config");
const player_controller_1 = require("./players/player.controller");
const players_modules_config_1 = require("./players/players-modules.config");
const datasource_1 = require("./core/datasource");
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)("./deporty-dev-firebase-adminsdk.json"),
});
const db = (0, firestore_1.getFirestore)();
modules_config_1.DEPENDENCIES_CONTAINER.addValue({
    id: "FirebaseDatabase",
    value: db,
});
modules_config_1.DEPENDENCIES_CONTAINER.add({
    id: "DataSource",
    kind: datasource_1.DataSource,
    strategy: "singleton",
    dependencies: ["FirebaseDatabase"],
    override: firebase_datasource_1.FirebaseDataSource,
});
players_modules_config_1.PlayersModulesConfig.config(modules_config_1.DEPENDENCIES_CONTAINER);
exports.app = express();
player_controller_1.PlayerController.registerEntryPoints(exports.app);
exports.app = functions.https.onRequest(exports.app);
//# sourceMappingURL=index.js.map