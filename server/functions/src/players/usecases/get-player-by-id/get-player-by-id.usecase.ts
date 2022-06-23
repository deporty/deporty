import { IPlayerModel } from '@deporty/entities/players';
import { Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { PlayerContract } from '../../player.contract';
import { PlayerDoesNotExistException } from './get-player-by-id.exceptions';

export class GetPlayerByIdUsecase extends Usecase<
  string,
  IPlayerModel
> {
  constructor(private playerContract: PlayerContract) {
    super();
  }
  call(id: string): Observable<IPlayerModel > {
    console.log(1,id)
    return this.playerContract.getPlayerById(id).pipe(
      map((player: IPlayerModel | undefined) => {
        if (player) {
          return of(player);
        }
        return throwError(new PlayerDoesNotExistException(id));
      }),
      mergeMap((x) => x)
    );
  }
}
