"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePlayerUsecase = exports.PlayersDataSource = void 0;
const rxjs_1 = require("rxjs");
const exceptions_1 = require("../../../core/exceptions");
const usecase_1 = require("../../../core/usecase");
class PlayersDataSource {
    sayHello() {
        return "hola";
    }
}
exports.PlayersDataSource = PlayersDataSource;
class DeletePlayerUsecase extends usecase_1.Usecase {
    constructor(num) {
        super();
        this.num = num;
    }
    call(id) {
        if (id.length == 2) {
            return (0, rxjs_1.throwError)(new exceptions_1.VariableNotDefinedException("id"));
        }
        return (0, rxjs_1.of)();
    }
}
exports.DeletePlayerUsecase = DeletePlayerUsecase;
//# sourceMappingURL=delete-player.usecase.js.map