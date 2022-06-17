"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const controller_1 = require("../../core/controller/controller");
const modules_config_1 = require("../modules.config");
class PlayerController extends controller_1.BaseController {
    constructor() {
        super();
    }
    static registerEntryPoints(app) {
        app.get(`/delete/:id`, (request, response) => {
            const id = request.params.id;
            this.handlerController(modules_config_1.DEPENDENCIES_CONTAINER, 'DeletePlayerUsecase', response, undefined, id);
        });
        app.get(`/`, (request, response) => {
            this.handlerController(modules_config_1.DEPENDENCIES_CONTAINER, 'GetPlayersUsecase', response);
        });
        app.get(`/document/:document`, (request, response) => {
            const document = request.params.document;
            this.handlerController(modules_config_1.DEPENDENCIES_CONTAINER, 'GetPlayerByDocumentUsecase', response, undefined, document);
        });
        app.post(`/`, (request, response) => {
            const player = request.body;
            this.handlerPostController(modules_config_1.DEPENDENCIES_CONTAINER, 'CreatePlayerUsecase', response, 'PlayerMapper', player);
        });
    }
}
exports.PlayerController = PlayerController;
PlayerController.identifier = 'PLAYER';
//# sourceMappingURL=player.controller.js.map