import { Observable } from 'rxjs';

export abstract class AuthenticationRepository {
  public abstract login(email: string, password: string): Observable<string>;
}
