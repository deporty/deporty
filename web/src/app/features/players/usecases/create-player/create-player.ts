import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { PlayerAdapter } from '../../adapters/player.repository';
import { IPlayerModel } from '../../models/player.model';
@Injectable()
export class CreatePlayerUsecase extends BaseUsecase<IPlayerModel, string> {
  constructor(private playerAdapter: PlayerAdapter) {
    super();
  }

  call(player: IPlayerModel): Observable<string> {
    return this.playerAdapter.createPlayer(player);
  }
}
