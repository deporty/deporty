"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const controller_1 = require("../core/controller");
class PlayerController {
    static registerEntryPoints(app) {
        app.get(`/${this.prefix}/delete/:id`, (request, response) => {
            const id = request.params.id;
            (0, controller_1.handlerController)("DeletePlayerUsecase", response, undefined, id);
        });
        app.get(`/${this.prefix}s`, (request, response) => {
            (0, controller_1.handlerController)("GetPlayersUsecase", response);
        });
        app.get(`/${this.prefix}/document/:document`, (request, response) => {
            const document = request.params.document;
            (0, controller_1.handlerController)("GetPlayerByDocumentUsecase", response, undefined, document);
        });
        app.post(`/${this.prefix}`, (request, response) => {
            const player = request.body;
            (0, controller_1.handlerPostController)("CreatePlayerUsecase", response, "PlayerMapper", player);
        });
    }
}
exports.PlayerController = PlayerController;
PlayerController.prefix = "player";
PlayerController.identifier = "PLAYER";
//# sourceMappingURL=player.controller.js.map