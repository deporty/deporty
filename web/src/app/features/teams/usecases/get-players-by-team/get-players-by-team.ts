import { Injectable } from '@angular/core';
import { IPlayerModel } from '@deporty/entities/players';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '@deporty/entities/teams';


@Injectable()
export class GetPlayersByTeamUsecase extends BaseUsecase<ITeamModel, IPlayerModel[]> {
  constructor(private teamAdapter: TeamAdapter) {
    super();
  }
  call(param: ITeamModel): Observable<IPlayerModel[]> {
    return this.teamAdapter.getPlayersByTeam(param);
  }
}
