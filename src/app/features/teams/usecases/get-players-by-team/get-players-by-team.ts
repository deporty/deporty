import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { IPlayerModel } from 'src/app/features/players/models/player.model';
import { TournamentAdapter } from '../../../tournaments/adapters/tournament.adapter';
import { IGroupModel } from '../../../tournaments/models/group.model';
import { IMatchModel } from '../../../tournaments/models/match.model';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '../../models/team.model';

@Injectable()
export class GetPlayersByTeamUsecase extends BaseUsecase<ITeamModel, IPlayerModel[]> {
  constructor(private teamAdapter: TeamAdapter) {
    super();
  }
  call(param: ITeamModel): Observable<IPlayerModel[]> {
    return this.teamAdapter.getPlayersByTeam(param);
  }
}
