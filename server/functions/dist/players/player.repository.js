"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
const operators_1 = require("rxjs/operators");
const player_contract_1 = require("./player.contract");
class PlayerRepository extends player_contract_1.PlayerContract {
    constructor(dataSource, playerMapper) {
        super();
        this.dataSource = dataSource;
        this.playerMapper = playerMapper;
        this.dataSource.entity = PlayerRepository.entity;
    }
    getPlayers() {
        return this.dataSource.getByFilter([]).pipe((0, operators_1.map)((docs) => {
            return docs.map(this.playerMapper.fromJson);
        }));
    }
}
exports.PlayerRepository = PlayerRepository;
PlayerRepository.entity = "players";
//# sourceMappingURL=player.repository.js.map