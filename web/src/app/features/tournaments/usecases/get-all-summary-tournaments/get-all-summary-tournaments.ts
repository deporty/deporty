import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { ITournamentModel } from '../../models/tournament.model';

@Injectable()
export class GetAllSummaryTournamentsUsecase extends BaseUsecase<
  any,
  ITournamentModel[]
> {
  constructor(private tournamentAdapter: TournamentAdapter) {
    super();
  }

  call(): Observable<ITournamentModel[]> {
    return this.tournamentAdapter.getAllSummaryTournaments();
  }
}
