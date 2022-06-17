"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerAlreadyExistsException = void 0;
class PlayerAlreadyExistsException extends Error {
    constructor(document) {
        super();
        this.message = `The player's ${document} already exists.`;
        this.name = "PlayerAlreadyExistsException";
    }
}
exports.PlayerAlreadyExistsException = PlayerAlreadyExistsException;
//# sourceMappingURL=get-player-by-document.exceptions.js.map