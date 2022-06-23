import { IPlayerModel } from '@deporty/entities/players';
import { Observable } from 'rxjs';
import { IBaseResponse } from '@deporty/entities/general';


export abstract class PlayerAdapter {
  public abstract getAllSummaryPlayers(): Observable<any>;
  public abstract deletePlayerById(id: string): Observable<IBaseResponse<string>>;
  abstract createPlayer(player: IPlayerModel): Observable<IBaseResponse<string>>;
}
