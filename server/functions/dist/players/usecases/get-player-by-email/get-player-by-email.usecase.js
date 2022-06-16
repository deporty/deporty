"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayerByEmailUsecase = void 0;
const operators_1 = require("rxjs/operators");
const usecase_1 = require("../../../core/usecase");
class GetPlayerByEmailUsecase extends usecase_1.Usecase {
    constructor(playerContract) {
        super();
        this.playerContract = playerContract;
    }
    call(email) {
        return this.playerContract
            .getByFilter([
            {
                property: "email",
                equals: email,
            },
        ])
            .pipe((0, operators_1.map)((players) => {
            return players.length > 0 ? players[0] : undefined;
        }));
    }
}
exports.GetPlayerByEmailUsecase = GetPlayerByEmailUsecase;
//# sourceMappingURL=get-player-by-email.usecase.js.map