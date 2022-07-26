import { Injectable } from '@angular/core';
import { IFixtureStageModel } from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TournamentAdapter } from '../../adapters/tournament.adapter';


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
