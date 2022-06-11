"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersModulesConfig = void 0;
const player_contract_1 = require("./player.contract");
const player_mapper_1 = require("./player.mapper");
const player_repository_1 = require("./player.repository");
const delete_player_usecase_1 = require("./usecases/delete-player/delete-player.usecase");
const get_players_usecase_1 = require("./usecases/get-players/get-players.usecase");
class PlayersModulesConfig {
    static config(container) {
        container.add({
            id: "PlayerMapper",
            kind: player_mapper_1.PlayerMapper,
            strategy: "singleton",
        });
        container.add({
            id: "PlayerContract",
            kind: player_contract_1.PlayerContract,
            override: player_repository_1.PlayerRepository,
            dependencies: ["DataSource", "PlayerMapper"],
            strategy: "singleton",
        });
        container.add({
            id: "GetPlayersUsecase",
            kind: get_players_usecase_1.GetPlayersUsecase,
            dependencies: ["PlayerContract"],
            strategy: "singleton",
        });
        container.add({
            id: "DeletePlayerUsecase",
            kind: delete_player_usecase_1.DeletePlayerUsecase,
            dependencies: ["PlayerContract"],
            strategy: "singleton",
        });
        // container.add({
        //   id: "DeletePlayerUsecase",
        //   kind: DeletePlayerUsecase,
        //   dependencies: ["PlayersDataSource"],
        //   strategy: "singleton",
        // });
    }
}
exports.PlayersModulesConfig = PlayersModulesConfig;
//# sourceMappingURL=players-modules.config.js.map