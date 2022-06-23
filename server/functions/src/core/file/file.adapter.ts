import { Observable } from 'rxjs';

export abstract class FileAdapter {
  abstract uploadFile(filePath: string, file: string): Observable<any>;
  abstract deleteFile(filePath: string): Observable<any>;
}
