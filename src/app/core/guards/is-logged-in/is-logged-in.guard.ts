import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { app } from 'src/app/init-app';
import { TokenService } from '../../infrastructure/services/token/token.service';

@Injectable()
export class IsLoggedInGuard implements CanLoad {
  constructor(private tokenService: TokenService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const auth = getAuth(app);
   

    return new Observable((observer) => {
      onAuthStateChanged(auth, (user) => {
        const isInSession = user != null && user != undefined;
        if (!isInSession) {
          this.router.navigate(['auth']);
        }

        observer.next(isInSession);
        observer.complete();
      });
    });

  }
}
