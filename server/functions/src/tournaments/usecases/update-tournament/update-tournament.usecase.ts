import { IMatchModel, ITournamentModel } from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { TournamentContract } from '../../tournament.contract';

export interface Param {
  tournamentId: string;
  stageId: string;
  groupIndex: number;
  match: IMatchModel;
}

export class UpdateTournamentUsecase extends Usecase<ITournamentModel, void> {
  constructor(private tournamentContract: TournamentContract) {
    super();
  }

  call(tournament: ITournamentModel): Observable<void> {
    return this.tournamentContract.update(tournament.id, tournament).pipe(
      tap((x) => {
      })
    );
  }
}
