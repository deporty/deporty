"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
class Container {
    constructor() {
        this.table = {};
    }
    getInstance(id) {
        return this.table[id].instance;
    }
    getDependencies(dependenciesId) {
        const response = [];
        for (const dep of dependenciesId) {
            response.push(this.getInstance(dep));
        }
        return response;
    }
    add(config) {
        let typeClass = config.kind;
        if (config.override) {
            typeClass = config.override;
        }
        const params = this.getDependencies(config.dependencies || []);
        if (config.id === "PlayerContract") {
            console.log(params);
        }
        const constructor = () => Reflect.construct(typeClass, params);
        this.table[config.id] = {
            constructor,
            instance: constructor(),
        };
    }
    addValue(config) {
        this.table[config.id] = {
            constructor: () => config.value,
            instance: config.value,
        };
    }
}
exports.Container = Container;
//# sourceMappingURL=DI.js.map