import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationRepository } from '../../../domain/repository/authentication.repository';

@Injectable()
export class AuthenticationService extends AuthenticationRepository {

  constructor() {
    super();
  }

  login(email: string, password: string): Observable<string> {
    const auth = getAuth();
    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      catchError((error) => {
        return of(null);
      }),
      map((item: any) => {
        if (item) {
          return item.user.accessToken;
        }
        return null;
      })
    );
  }


}
