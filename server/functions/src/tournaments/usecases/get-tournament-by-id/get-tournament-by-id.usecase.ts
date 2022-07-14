import { ITournamentModel } from '@deporty/entities/tournaments';
import { Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { TournamentContract } from '../../tournament.contract';
import { TournamentDoesNotExist } from './get-tournament-by-id.exceptions';

export class GetTournamentByIdUsecase extends Usecase<
  string,
  ITournamentModel
> {
  constructor(private tournamentContract: TournamentContract) {
    super();
  }
  call(tournamentId: string): Observable<ITournamentModel> {
    return this.tournamentContract.getByIdPopulate(tournamentId).pipe(
      map((tournament: ITournamentModel | undefined) => {
        
        if (!tournament) {
          return throwError(new TournamentDoesNotExist(tournamentId));
        }
        return of(tournament);
      }),
      mergeMap((x) => x)
    );
  }
}
