import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { IMatchModel } from '@deporty/entities/tournaments';

export interface Params {
  match: IMatchModel;
  groupIndex: number;
  stageIndex: string;
  tournamentId: string;
}

@Injectable()
export class EditMatchOfGroupUsecase extends BaseUsecase<Params, void> {
  constructor(private tournamentService: TournamentAdapter) {
    super();
  }
  call(param: Params): Observable<void> {
   return this.tournamentService.editMatchOfGroupInsideTournament(
      param.tournamentId,
      param.stageIndex,
      param.groupIndex,
      param.match
    );
  }
}
