"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
class PlayerRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        console.log(this.dataSource);
    }
    getPlayers() {
        const teamsCol = this.dataSource.getByFilter([]);
        return teamsCol;
    }
}
exports.PlayerRepository = PlayerRepository;
//# sourceMappingURL=player.repository%20copy.js.map