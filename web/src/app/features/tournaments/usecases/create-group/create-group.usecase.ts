import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { IGroupModel } from '@deporty/entities/tournaments';

export interface Params {
  group: Omit<IGroupModel, 'order'>;
  stageIndex: string;
  tournamentId: string;
}

@Injectable()
export class CreateGroupUsecase extends BaseUsecase<Params, void> {
  constructor(private tournamentAdapter: TournamentAdapter) {
    super();
  }
  call(param: Params): Observable<void> {
    return this.tournamentAdapter.createGroupInsideTournament(
      param.tournamentId,
      param.stageIndex,
      param.group
    );
  }
}
