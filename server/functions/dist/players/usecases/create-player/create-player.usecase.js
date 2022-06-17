"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlayerUsecase = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const usecase_1 = require("../../../core/usecase");
const create_player_exceptions_1 = require("./create-player.exceptions");
class CreatePlayerUsecase extends usecase_1.Usecase {
    constructor(playerContract, getPlayerByDocumentUsecase, getPlayerByEmailUsecase) {
        super();
        this.playerContract = playerContract;
        this.getPlayerByDocumentUsecase = getPlayerByDocumentUsecase;
        this.getPlayerByEmailUsecase = getPlayerByEmailUsecase;
    }
    call(player) {
        return this.getPlayerByDocumentUsecase.call(player.document).pipe((0, operators_1.map)((playerPrev) => {
            if (playerPrev) {
                return (0, rxjs_1.throwError)(new create_player_exceptions_1.PlayerAlreadyExistsException(playerPrev.document));
            }
            else {
                if (player.email != undefined) {
                    return this.getPlayerByEmailUsecase.call(player.email).pipe((0, operators_1.map)((playerEmailPrev) => {
                        if (playerEmailPrev) {
                            return (0, rxjs_1.throwError)(new create_player_exceptions_1.PlayerAlreadyExistsException(player.email));
                        }
                        else {
                            return this.playerContract.save(player);
                        }
                    }), (0, operators_1.mergeMap)((x) => x));
                }
                return this.playerContract.save(player);
            }
        }), (0, operators_1.mergeMap)((x) => x));
    }
}
exports.CreatePlayerUsecase = CreatePlayerUsecase;
//# sourceMappingURL=create-player.usecase.js.map