import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { ITournamentModel } from '../../models/tournament.model';

@Injectable()
export class GetTournamentInfoUsecase extends BaseUsecase<
  string,
  ITournamentModel
> {
  constructor(private tournamentService: TournamentAdapter) {
    super();
  }

  call(id: string): Observable<ITournamentModel> {
      return this.tournamentService.getTournamentSummaryById(id)
  }
}
