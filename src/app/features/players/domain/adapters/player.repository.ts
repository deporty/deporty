import { Observable } from 'rxjs';

export abstract class PlayerRepository {
  public abstract getAllSummaryPlayers(): Observable<any>;
}
