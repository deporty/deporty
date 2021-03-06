import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { IGroupModel } from '../../models/group.model';
import { IMatchModel } from '../../models/match.model';

export interface Params {
  match: IMatchModel;
  groupIndex: number;
  stageIndex: string;
  tournamentId: string;
}

@Injectable()
export class AddMatchToGroupUsecase extends BaseUsecase<Params, void> {
  constructor(private tournamentService: TournamentAdapter) {
    super();
  }
  call(param: Params): Observable<void> {
   return this.tournamentService.addMatchToGroupInsideTournament(
      param.tournamentId,
      param.stageIndex,
      param.groupIndex,
      param.match
    );
  }
}
