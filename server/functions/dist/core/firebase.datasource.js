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
        console.log(this.entity, 'enti', id);
        return (0, rxjs_1.from)(this.db.collection(this.entity).doc(id).get()).pipe((0, operators_1.map)((item) => {
            console.log('data data ', item.data());
            return item.data()
                ? Object.assign(Object.assign({}, item.data()), { id: item.id }) : undefined;
        }));
    }
    getByFilter(filters) {
        return (0, rxjs_1.from)(this.db.collection(this.entity).get()).pipe((0, operators_1.map)((snapshot) => {
            return snapshot.docs
                .map((doc) => {
                return Object.assign(Object.assign({}, doc.data()), { id: doc.id });
            })
                .filter((x) => {
                let response = true;
                if (filters.length > 0) {
                    response = false;
                    for (const fil of filters) {
                        response = x[fil.property] == fil.equals;
                        if (response)
                            break;
                    }
                }
                return response;
            });
        }));
    }
    deleteById(id) {
        const entitySnapshot = this.db.collection(this.entity).doc(id);
        return (0, rxjs_1.from)(entitySnapshot.delete()).pipe((0, operators_1.map)((item) => {
            return;
        }));
    }
    save(entity) {
        return (0, rxjs_1.from)(this.db.collection(this.entity).add(entity)).pipe((0, operators_1.map)((snapshot) => {
            return snapshot.id;
        }), (0, operators_1.catchError)((err) => {
            return (0, rxjs_1.of)('');
        }));
    }
}
exports.FirebaseDataSource = FirebaseDataSource;
//# sourceMappingURL=firebase.datasource.js.map