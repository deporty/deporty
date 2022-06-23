import { Storage } from 'firebase-admin/storage';
import { existsSync, rmSync, writeFileSync } from 'fs';
import { from, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FileAdapter } from './file.adapter';
const mime = require('mime-types');

export class FileRepository extends FileAdapter {
  deleteFile(filePath: string): Observable<any> {
    return from(this.storage.bucket().file(filePath).delete()).pipe(
      catchError((error) => {
        return of(false);
      })
    );
  }
  constructor(private storage: Storage) {
    super();
  }

  createLocalFile(data: string, location: string) {
    writeFileSync(location as string, data, { encoding: 'base64', flag: 'w', mode: 0o777 });
  }

  deleteLocalFile(location: string) {
    if (existsSync(location)) {
      rmSync(location, {
        force: true,
        recursive: true,
      });
    }
  }

  uploadFile(filePath: string, fileData: string): Observable<any> {
    let data = fileData.split(';base64,').pop();
    const fragments = filePath.split('/');
    const name = fragments.pop();
    this.createLocalFile(data as string, name as string);
    const fileMime = mime.lookup(filePath);
    return from(
      this.storage.bucket().upload(name as string, {
        destination: filePath,
        contentType: fileMime,
      })
    ).pipe(
      tap(() => {
        if (name) {
          this.deleteFile(name);
        }
      })
    );
  }
}
