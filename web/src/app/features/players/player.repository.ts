import { IPlayerModel } from '@deporty/entities/players';
import { Observable } from 'rxjs';


export abstract class PlayerAdapter {
  public abstract getAllSummaryPlayers(): Observable<any>;
  abstract createPlayer(player: IPlayerModel): Observable<string>;
}
