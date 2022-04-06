import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRoutingModule } from 'src/app/features/auth/auth-routing.module';
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
    const response = this.tokenService.isTokenValid() || true;
    console.log(response);
    if (!response) {
      this.router.navigate([AuthRoutingModule.route]);
    }

    return response;
  }
}
