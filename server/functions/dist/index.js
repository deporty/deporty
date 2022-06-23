"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase-admin/app");
const functions = require("firebase-functions");
const firebaseApp = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)('./deporty-dev-firebase-adminsdk.json'),
    storageBucket: 'deporty-dev.appspot.com'
});
const players_1 = require("./players");
const teams_1 = require("./teams");
exports.players = functions.https.onRequest((0, players_1.main)(firebaseApp));
exports.teams = functions.https.onRequest(teams_1.app);
//# sourceMappingURL=index.js.map