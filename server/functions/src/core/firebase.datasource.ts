import {
  DocumentData,
  DocumentReference,
  Firestore,
} from 'firebase-admin/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataSource, DataSourceFilter } from './datasource';

export class FirebaseDataSource extends DataSource<any> {
  constructor(private db: Firestore) {
    super();
  }
  getById(id: string): Observable<any> {
    console.log(this.entity, 'enti', id);
    return from(this.db.collection(this.entity).doc(id).get()).pipe(
      map((item: FirebaseFirestore.DocumentSnapshot<DocumentData>) => {
        console.log('data data ', item.data());
        return item.data()
          ? {
              ...item.data(),
              id: item.id,
            }
          : undefined;
      })
    );
  }
  getByFilter(filters: DataSourceFilter[]): Observable<any[]> {
    return from(this.db.collection(this.entity).get()).pipe(
      map((snapshot) => {
        return snapshot.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
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
    const entitySnapshot = this.db.collection(this.entity).doc(id);
    return from(entitySnapshot.delete()).pipe(
      map((item) => {
        return;
      })
    );
  }

  save(entity: any): Observable<string> {
    return from(this.db.collection(this.entity).add(entity)).pipe(
      map((snapshot: DocumentReference<DocumentData>) => {
        return snapshot.id;
      }),
      catchError((err) => {
        return of('');
      })
    );
  }
}
