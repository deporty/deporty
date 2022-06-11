"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPENDENCIES_CONTAINER = void 0;
const DI_1 = require("./core/DI");
const delete_player_usecase_1 = require("./players/usecases/delete-player/delete-player.usecase");
exports.DEPENDENCIES_CONTAINER = new DI_1.Container();
exports.DEPENDENCIES_CONTAINER.add({
    id: "PlayersDataSource",
    kind: delete_player_usecase_1.PlayersDataSource,
    dependencies: [],
    strategy: "singleton",
});
exports.DEPENDENCIES_CONTAINER.add({
    id: "DeletePlayerUsecase",
    kind: delete_player_usecase_1.DeletePlayerUsecase,
    dependencies: ["PlayersDataSource"],
    strategy: "singleton",
});
//# sourceMappingURL=modules.config.js.map