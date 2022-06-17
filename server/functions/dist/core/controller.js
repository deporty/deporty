"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerController = exports.handlerPostController = void 0;
const modules_config_1 = require("../modules.config");
function handlerPostController(usecaseIdentifier, response, mapper, param) {
    let func = null;
    if (mapper) {
        const mapperObj = modules_config_1.DEPENDENCIES_CONTAINER.getInstance(mapper);
        func = mapperObj.fromJsonWithOutId;
    }
    generalHandlerController(usecaseIdentifier, param, func, response);
}
exports.handlerPostController = handlerPostController;
function handlerController(usecaseIdentifier, response, mapper, param) {
    let func = null;
    if (mapper) {
        const mapperObj = modules_config_1.DEPENDENCIES_CONTAINER.getInstance(mapper);
        func = mapperObj.fromJson;
    }
    generalHandlerController(usecaseIdentifier, param, func, response);
}
exports.handlerController = handlerController;
function generalHandlerController(usecaseIdentifier, param, func, response) {
    const usecase = modules_config_1.DEPENDENCIES_CONTAINER.getInstance(usecaseIdentifier);
    let dataRes = null;
    let params = param;
    if (func) {
        if (param) {
            params = func(param);
            dataRes = usecase.call(params);
        }
        else {
            dataRes = usecase.call();
        }
    }
    else {
        if (param) {
            dataRes = usecase.call(param);
        }
        else {
            dataRes = usecase.call();
        }
    }
    dataRes.subscribe({
        next: (data) => {
            response.send(data);
        },
        error: (err) => {
            console.log(err);
            response.send(err);
        },
        complete: () => {
            response.send();
        },
    });
}
//# sourceMappingURL=controller.js.map