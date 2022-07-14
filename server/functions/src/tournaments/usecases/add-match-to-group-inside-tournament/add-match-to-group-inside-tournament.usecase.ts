import { IMatchModel } from '@deporty/entities/tournaments';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetTournamentByIdUsecase } from '../get-tournament-by-id/get-tournament-by-id.usecase';

export interface Param {
  tournamentId: string;
  stageId: string;
  groupIndex: number;
  match: IMatchModel;
}

export class AddMatchToGroupInsideTournamentUsecase extends Usecase<
  Param,
  void
> {
  constructor(private getTournamentByIdUsecase: GetTournamentByIdUsecase) {
    super();
  }

  call(param: Param): Observable<void> {
    return this.getTournamentByIdUsecase.call(param.tournamentId).pipe(
      catchError((error) => throwError(error)),
      map((tournament) => {
          
      })
    );
  }
}
