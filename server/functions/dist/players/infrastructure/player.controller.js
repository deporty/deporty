"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const controller_1 = require("../../core/controller/controller");
class PlayerController extends controller_1.BaseController {
    constructor() {
        super();
    }
    static registerEntryPoints(app) {
        app.get(`/${this.prefix}/delete/:id`, (request, response) => {
            const id = request.params.id;
            this.handlerController("DeletePlayerUsecase", response, undefined, id);
        });
        app.get(`/${this.prefix}s`, (request, response) => {
            this.handlerController("GetPlayersUsecase", response);
        });
        app.get(`/${this.prefix}/document/:document`, (request, response) => {
            const document = request.params.document;
            this.handlerController("GetPlayerByDocumentUsecase", response, undefined, document);
        });
        app.post(`/${this.prefix}`, (request, response) => {
            const player = request.body;
            this.handlerPostController("CreatePlayerUsecase", response, "PlayerMapper", player);
        });
    }
}
exports.PlayerController = PlayerController;
PlayerController.prefix = "player";
PlayerController.identifier = "PLAYER";
//# sourceMappingURL=player.controller.js.map