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

  mapInsideReferences(jsonData: any, p = false): Observable<any> {
    const entries = Object.entries<any>(jsonData);
    const newObj = { ...jsonData };
    const populatedAttributes: any[] = [];
    for (const entry of entries) {
      if (entry[1] instanceof DocumentReference) {
        this.mapDocumentReferences(populatedAttributes, entry);
      } else if (entry[1] instanceof Timestamp) {
        this.mapDateReferences(newObj, entry);
      } else if (Array.isArray(entry[1])) {
       
        this.mapArrayReferences(entry, populatedAttributes);
      } else if (
        typeof entry[1] === 'number' ||
        typeof entry[1] === 'string' ||
        typeof entry[1] === 'boolean'
      ) {
        this.mapPrimitiveReferences(populatedAttributes, entry);
      } else if (entry[1] instanceof Object) {
        this.mapObjectReferences(populatedAttributes, entry);
      }
    }

    const $populatedAttributes =
      populatedAttributes.length > 0 ? zip(...populatedAttributes) : of([]);
    const $obj = of(newObj);
    return zip($obj, $populatedAttributes).pipe(
      map((data) => {
        const originalObj: any = data[0];
        const modifiedAttributes: any = data[1];

        for (const attr of modifiedAttributes) {
          originalObj[attr['attribute']] = attr['value'];
        }
        return originalObj;
      })
    );
  }

  private mapDocumentReferences(
    populatedAttributes: any[],
    entry: [string, any]
  ) {
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
  }

  private mapDateReferences(newObj: any, entry: [string, any]) {
    newObj[entry[0]] = getDateFromSeconds(entry[1].seconds);
  }

  private mapArrayReferences(entry: [string, any], populatedAttributes: any[]) {
    const arrayProperties = [];
    for (const element of entry[1]) {
      if (element instanceof DocumentReference) {
        arrayProperties.push(this.fromReference(element));
      } else if (entry[1] instanceof Timestamp) {
        arrayProperties.push(of(getDateFromSeconds(element.seconds)));
      } else if (
        typeof element === 'number' ||
        typeof element === 'string' ||
        typeof element === 'boolean'
      ) {
        arrayProperties.push(of(element));
      } else if (element instanceof Object) {
        const tempRes = this.mapInsideReferences(element);

        arrayProperties.push(tempRes);
      }
    }
    const temp = arrayProperties.length > 0 ? zip(...arrayProperties) : of([]);

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
  }

  private mapPrimitiveReferences(
    populatedAttributes: any[],
    entry: [string, any]
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
  }

  private mapObjectReferences(
    populatedAttributes: any[],
    entry: [string, any]
  ) {
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

  fromReference<O>(obj: DocumentReference): Observable<O> {
    return from(obj.get()).pipe(
      map((ob: DocumentSnapshot<DocumentData>) => {
        return {
          ...ob.data(),
          id: ob.id,
        };
      }),
      map((x) => this.mapInsideReferences(x)),
      mergeMap((x) => x)
    );
  }
}
