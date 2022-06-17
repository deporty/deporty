"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableNotDefinedException = exports.EmptyStringException = void 0;
class EmptyStringException extends Error {
    constructor(property) {
        super();
        this.message = `The ${property} is empty.`;
        this.name = "EmptyStringException";
    }
}
exports.EmptyStringException = EmptyStringException;
class VariableNotDefinedException extends Error {
    constructor(property) {
        super();
        this.message = `The ${property} is not defined.`;
        this.name = "VariableNotDefinedException";
    }
}
exports.VariableNotDefinedException = VariableNotDefinedException;
//# sourceMappingURL=exceptions.js.map