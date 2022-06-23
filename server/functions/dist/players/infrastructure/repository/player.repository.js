"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
const operators_1 = require("rxjs/operators");
const player_contract_1 = require("../../player.contract");
class PlayerRepository extends player_contract_1.PlayerContract {
    constructor(dataSource, playerMapper, fileAdapter) {
        super();
        this.dataSource = dataSource;
        this.playerMapper = playerMapper;
        this.fileAdapter = fileAdapter;
        this.dataSource.entity = PlayerRepository.entity;
    }
    getPlayers() {
        return this.dataSource.getByFilter([]).pipe((0, operators_1.map)((docs) => {
            return docs.map(this.playerMapper.fromJson);
        }));
    }
    getByFilter(filters) {
        return this.dataSource.getByFilter(filters).pipe((0, operators_1.map)((docs) => {
            return docs.map(this.playerMapper.fromJson);
        }));
    }
    save(player) {
        const mappedPlayer = this.playerMapper.toJson(player);
        return this.dataSource.save(mappedPlayer);
    }
    delete(id) {
        return this.dataSource.deleteById(id).pipe((0, operators_1.tap)(() => {
            this.fileAdapter.deleteFile('');
        }));
    }
    getPlayerById(id) {
        console.log(2, id);
        return this.dataSource.getById(id).pipe((0, operators_1.map)((player) => {
            return player ? this.playerMapper.fromJson(player) : undefined;
        }));
    }
}
exports.PlayerRepository = PlayerRepository;
PlayerRepository.entity = 'players';
//# sourceMappingURL=player.repository.js.map