"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase-admin/app");
const functions = require("firebase-functions");
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)('./deporty-dev-firebase-adminsdk.json'),
});
const players_1 = require("./players");
exports.players = functions.https.onRequest(players_1.app);
//# sourceMappingURL=index.js.map