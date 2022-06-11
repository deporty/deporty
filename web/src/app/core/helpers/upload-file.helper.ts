import { ref, uploadBytes } from 'firebase/storage';
import { from, Observable } from 'rxjs';

import { storage } from 'src/app/init-app';

export function uploadFileToStorage(
  fullPath: string,
  file: File
): Observable<any> {
  const storageRef = ref(storage, fullPath);

  return from(uploadBytes(storageRef, file));
}

export function getExtensionFileFromBase64(base64: string) {
  const extension = base64.split(',')[0].split('/')[1].split(';')[0];
  return extension;
}
