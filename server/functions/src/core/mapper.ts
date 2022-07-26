import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
} from 'firebase-admin/firestore';
import { from, Observable, of, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { getDateFromSeconds } from './helpers';

export abstract class Mapper<T> {
  abstract fromJson(obj: any): T;
  abstract fromJsonWithOutId(obj: any): Omit<T, 'id'>;
  abstract toJson(player: T): any;
  abstract toReferenceJson(obj: T): any;
  abstract fromReferenceJson(obj: any): any;

  mapInsideReferences(jsonData: any): Observable<any> {
    const entries = Object.entries<any>(jsonData);
    const newObj = { ...jsonData };
    const populatedAttributes = [];
    for (const entry of entries) {
      if (entry[1] instanceof DocumentReference) {
        populatedAttributes.push(
          this.fromReference(entry[1]).pipe(
            map((value) => {
              return {
                attribute: entry[0],
                value,
              };
            })
          )
        );
      } else if (entry[1] instanceof Timestamp) {
        newObj[entry[0]] = getDateFromSeconds(entry[1].seconds);
      } else if (Array.isArray(entry[1])) {
        const arrayProperties = [];
        for (const element of entry[1]) {
          if (element instanceof DocumentReference) {
            arrayProperties.push(this.fromReference(element));
          } else if (
            typeof element === 'number' ||
            typeof element === 'string' ||
            typeof element === 'boolean'
          ) {
            arrayProperties.push(of(element));
          } else if (element instanceof Object) {
            arrayProperties.push(this.mapInsideReferences(element));
          }
        }
        const temp =
          arrayProperties.length > 0 ? zip(...arrayProperties) : of([]);

        populatedAttributes.push(
          temp.pipe(
            map((value) => {
              return {
                attribute: entry[0],
                value,
              };
            })
          )
        );
      } else if (
        typeof entry[1] === 'number' ||
        typeof entry[1] === 'string' ||
        typeof entry[1] === 'boolean'
      ) {
        populatedAttributes.push(
          of(entry[1]).pipe(
            map((value) => {
              return {
                attribute: entry[0],
                value,
              };
            })
          )
        );
      } else if (entry[1] instanceof Object) {
        populatedAttributes.push(
          this.mapInsideReferences(entry[1]).pipe(
            map((value) => {
              return {
                attribute: entry[0],
                value,
              };
            })
          )
        );
      }
    }

    const $populatedAttributes =
      populatedAttributes.length > 0 ? zip(...populatedAttributes) : of([]);
    const $obj = of(newObj);
    return zip($obj, $populatedAttributes).pipe(
      map((data) => {
        const originalObj: any = data[0];
        const modifiedAttributes = data[1];

        for (const attr of modifiedAttributes) {
          originalObj[attr['attribute']] = attr['value'];
        }
        return originalObj;
      })
    );
  }

  fromReference<O>(obj: DocumentReference): Observable<O> {
    return from(obj.get()).pipe(
      map((ob: DocumentSnapshot<DocumentData>) => {
        return {
          ...ob.data(),
          id: ob.id,
        };
      }),
      map(x => this.mapInsideReferences(x)),
      mergeMap((x) => x)
    );
  }
}
