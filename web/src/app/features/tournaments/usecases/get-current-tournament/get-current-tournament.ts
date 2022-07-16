import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { ITournamentModel } from '@deporty/entities/tournaments';

@Injectable()
export class GetCurrentTournamentUsecase extends BaseUsecase<
  string,
  ITournamentModel | null
> {
  constructor(private tournamentAdapter: TournamentAdapter) {
    super();
  }
  call(location: string): Observable<ITournamentModel | null> {
    if (location) {
      return this.tournamentAdapter.getCurrentTournamentSummaryByLocation(
        location
      );
    }
    return of(null);
  }
}
