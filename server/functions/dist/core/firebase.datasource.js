"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseDataSource = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const datasource_1 = require("./datasource");
class FirebaseDataSource extends datasource_1.DataSource {
    constructor(db) {
        super();
        this.db = db;
    }
    getById(id) {
        throw new Error("Method not implemented.");
    }
    getByFilter(filters) {
        return (0, rxjs_1.from)(this.db.collection(this.entity).get()).pipe((0, operators_1.map)((snapshot) => {
            return snapshot.docs.map((doc) => {
                return Object.assign({ id: doc.id }, doc.data());
            });
        }));
    }
    deleteById(id) {
        // const entitySnapshot = doc(db, this.entity, id);
        throw new Error("Method not implemented.");
    }
}
exports.FirebaseDataSource = FirebaseDataSource;
//# sourceMappingURL=firebase.datasource.js.map