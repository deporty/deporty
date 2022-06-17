import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { IFixtureStageModel } from '../../models/fixture-stage.model';
import { IMatchModel } from '../../models/match.model';
import { ITournamentModel } from '../../models/tournament.model';

@Injectable()
export class GetFixtureStagesUsecase extends BaseUsecase<
  string,
  IFixtureStageModel[]
> {
  constructor(private tournamentAdapter: TournamentAdapter) {
    super();
  }
  call(id: string): Observable<IFixtureStageModel[]> {
    return this.tournamentAdapter.getTournamentFixtureStagesById(id);
  }
}
