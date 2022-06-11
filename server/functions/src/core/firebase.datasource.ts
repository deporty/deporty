import {
  DocumentData,
  DocumentReference,
  Firestore,
} from "firebase-admin/firestore";
import { from, Observable } from "rxjs";
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
        return snapshot.docs
          .map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
          .filter((x: any) => {
            let response = true;
            if (filters.length > 0) {
              response = false;
              for (const fil of filters) {
                response = x[fil.property] == fil.equals;
                if (response) break;
              }
            }

            return response;
          });
      })
    );
  }
  deleteById(id: string): Observable<void> {
    // const entitySnapshot = doc(db, this.entity, id);

    throw new Error("Method not implemented.");
  }

  save(entity: any): Observable<string> {
    return from(this.db.collection(this.entity).add(entity)).pipe(
      map((snapshot: DocumentReference<DocumentData>) => {
        return snapshot.id;
      })
    );
  }
}
