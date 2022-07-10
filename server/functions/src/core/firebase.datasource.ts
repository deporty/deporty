import {
  DocumentData,
  DocumentReference,
  Firestore,
} from 'firebase-admin/firestore';
import { from, Observable, of, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataSource, DataSourceFilter } from './datasource';

export class FirebaseDataSource extends DataSource<any> {
  constructor(private db: Firestore) {
    super();
  }

  getById(id: string): Observable<any> {
    console.log(id,'id',this.entity,'etnti')
    return from(this.db.collection(this.entity).doc(id).get()).pipe(
      map((item: FirebaseFirestore.DocumentSnapshot<DocumentData>) => {
        const response = {
          ...item.data(),
          id: item.id,
        };
        return item.data() ? response : undefined;
      })
    );
  }

  getByIdPopulate(id: string, sub: string[]): Observable<any> {
    if (!sub) {
      sub = [];
    }
    return of(this.db.collection(this.entity).doc(id)).pipe(
      map((ref: DocumentReference<DocumentData>) => {
        const data = from(ref.get()).pipe(
          map((item) => {
            const response = {
              ...item.data(),
              id: item.id,
            };
            return item.data() ? response : undefined;
          })
        );

        const $toZip: any = [data];
        for (const key of sub) {
          $toZip.push(from(ref.collection(key).get()));
        }
        return zip(...$toZip).pipe(
          map((_data: any[]) => {
            const res = {
              ..._data[0],
            };
            for (let i = 1; i < _data.length; i++) {
              const element = _data[i];

              res[sub[i - 1]] = element.docs.map((doc: any) => {
                return { ...doc.data(), id: doc.id };
              });
            }
            return res;
          })
        );
      }),
      mergeMap((x) => x)
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

  update(id: string, entity: any): Observable<any> {
    return from(this.db.collection(this.entity).doc(id).set(entity)).pipe(
      map((snapshot: DocumentData) => {
        return { ...snapshot.data(), id: snapshot.id };
      }),
      catchError((err) => {
        return of('');
      })
    );
  }
}
