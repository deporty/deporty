"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const modules_config_1 = require("../../modules.config");
class BaseController {
    static handlerPostController(usecaseIdentifier, response, mapper, param) {
        let func = null;
        if (mapper) {
            const mapperObj = modules_config_1.DEPENDENCIES_CONTAINER.getInstance(mapper);
            func = mapperObj.fromJsonWithOutId;
        }
        this.generalHandlerController(usecaseIdentifier, param, func, response);
    }
    static handlerController(usecaseIdentifier, response, mapper, param) {
        let func = null;
        if (mapper) {
            const mapperObj = modules_config_1.DEPENDENCIES_CONTAINER.getInstance(mapper);
            func = mapperObj.fromJson;
        }
        this.generalHandlerController(usecaseIdentifier, param, func, response);
    }
    static generalHandlerController(usecaseIdentifier, param, func, response) {
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
}
exports.BaseController = BaseController;
//# sourceMappingURL=controller.js.map