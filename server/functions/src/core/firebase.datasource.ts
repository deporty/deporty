import { Firestore } from "firebase-admin/firestore";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { DataSource, DataSourceFilter } from "./datasource";

export class FirebaseDataSource extends DataSource<any> {
  constructor(private db: Firestore) {
    super();
  }
  getById(id: string): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getByFilter(filters: DataSourceFilter[]): Observable<any[]> {
    return from(this.db.collection(this.entity).get()).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
      })
    );
  }
  deleteById(id: string): Observable<void> {
    // const entitySnapshot = doc(db, this.entity, id);

    throw new Error("Method not implemented.");
  }
}
