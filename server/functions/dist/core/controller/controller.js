"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    static handlerPostController(container, usecaseIdentifier, response, mapper, param) {
        let func = null;
        if (mapper) {
            const mapperObj = container.getInstance(mapper);
            func = mapperObj.fromJsonWithOutId;
        }
        this.generalHandlerController(container, usecaseIdentifier, param, func, response);
    }
    static handlerController(container, usecaseIdentifier, response, mapper, param) {
        let func = null;
        if (mapper) {
            const mapperObj = container.getInstance(mapper);
            func = mapperObj.fromJson;
        }
        this.generalHandlerController(container, usecaseIdentifier, param, func, response);
    }
    static generalHandlerController(container, usecaseIdentifier, param, func, response) {
        const usecase = container.getInstance(usecaseIdentifier);
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
                response.send({
                    meta: {
                        code: "200",
                        message: "",
                    },
                    data,
                });
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