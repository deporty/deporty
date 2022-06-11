import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { TournamentAdapter } from '../../adapters/tournament.adapter';

export interface Params {
  teams: ITeamModel[];
  groupIndex: number;
  stageIndex: string;
  tournamentId: string;
}

@Injectable()
export class AddTeamToGroupUsecase extends BaseUsecase<Params, void> {
  constructor(private tournamentAdapter: TournamentAdapter) {
    super();
  }

  call(param: Params): Observable<void> {
    return this.tournamentAdapter.addTeamToGroupTournament(
      param.tournamentId,
      param.stageIndex,
      param.groupIndex,
      param.teams
    );
  }
}
