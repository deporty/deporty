import { Observable } from 'rxjs';
import { IPlayerModel } from '../models/player.model';

export abstract class PlayerAdapter {
  public abstract getAllSummaryPlayers(): Observable<any>;
  abstract createPlayer(player: IPlayerModel): Observable<string>;
}
