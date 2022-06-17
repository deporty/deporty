"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const modules_config_1 = require("../modules.config");
class PlayerController {
    static registerEntryPoints(app) {
        app.get(`/${this.prefix}/delete/:id`, (request, response) => {
            const usecase = modules_config_1.DEPENDENCIES_CONTAINER.getInstance("DeletePlayerUsecase");
            const id = request.params.id;
            const dataRes = usecase.call(id);
            dataRes.subscribe({
                next: (data) => {
                    console.log(data, "NEXT");
                    response.send("The Player was deleted");
                },
                error: (err) => {
                    console.log("ERROR");
                    response.send(err);
                },
                complete: () => {
                    console.log("COMPLETE");
                    response.send("COMPLETADO");
                },
            });
        });
        app.get(`/${this.prefix}`, (request, response) => {
            const usecase = modules_config_1.DEPENDENCIES_CONTAINER.getInstance("DeletePlayerUsecase");
            const id = request.params.id;
            const dataRes = usecase.call(id);
            dataRes.subscribe({
                next: (data) => {
                    console.log(data, "NEXT");
                    response.send("The Player was deleted");
                },
                error: (err) => {
                    console.log("ERROR");
                    response.send(err);
                },
                complete: () => {
                    console.log("COMPLETE");
                    response.send("COMPLETADO");
                },
            });
        });
    }
}
exports.PlayerController = PlayerController;
PlayerController.prefix = "player";
//# sourceMappingURL=player.controller.js.map