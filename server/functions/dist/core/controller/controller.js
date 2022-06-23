"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const code_responses_1 = require("./code-responses");
class BaseController {
    static handlerPostController(container, usecaseIdentifier, response, config, mapper, param) {
        let func = null;
        if (mapper) {
            const mapperObj = container.getInstance(mapper);
            func = mapperObj.fromJsonWithOutId;
        }
        this.generalHandlerController(container, usecaseIdentifier, param, func, response, config);
    }
    static handlerController(container, usecaseIdentifier, response, config, mapper, param) {
        let func = null;
        if (mapper) {
            const mapperObj = container.getInstance(mapper);
            func = mapperObj.fromJson;
        }
        this.generalHandlerController(container, usecaseIdentifier, param, func, response, config);
    }
    static generalHandlerController(container, usecaseIdentifier, param, func, response, config) {
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
                let code = '';
                let message = '';
                if (typeof config.successCode == 'string') {
                    code = `${config.identifier}-${config.successCode}`;
                    message = code_responses_1.DEFAULT_MESSAGES[config.successCode];
                }
                else {
                    code = `${config.identifier}-${config.successCode.code}`;
                    message = config.successCode.message;
                }
                message = BaseController.formatMessage(message, config.extraData);
                response.send({
                    meta: {
                        code,
                        message,
                    },
                    data,
                });
            },
            error: (error) => {
                console.log(error, 777);
                const resp = this.makeErrorMessage(config, error);
                response.send(resp);
            },
            complete: () => {
                response.send();
            },
        });
    }
    static makeErrorMessage(config, error) {
        const data = Object.assign({}, error);
        const name = error.constructor.name;
        let httpMessageCode = config.exceptions[name];
        let message = '';
        if (httpMessageCode) {
            message = config.errorCodes[httpMessageCode];
            message = BaseController.formatMessage(message, data);
        }
        else {
            httpMessageCode = 'SERVER:ERROR';
            message = code_responses_1.DEFAULT_MESSAGES[httpMessageCode];
        }
        const code = `${config.identifier}-${httpMessageCode}`;
        return {
            meta: {
                code,
                message,
            },
        };
    }
    static formatMessage(message, data) {
        const keys = this.getKeys(message);
        if (keys) {
            for (const key of keys) {
                message = message.replace(`{${key}}`, data[key]);
            }
        }
        return message;
    }
    static getKeys(message) {
        const pattern = '{([A-Za-z]+)}';
        const regex = new RegExp(pattern);
        return regex.exec(message);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=controller.js.map