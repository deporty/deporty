import { ITournamentModel } from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { Usecase } from '../../../core/usecase';
import { TournamentContract } from '../../tournament.contract';

export class GetTournamentsUsecase extends Usecase<string, ITournamentModel[]> {
  constructor(private tournamentContract: TournamentContract) {
    super();
  }
  call(): Observable<ITournamentModel[]> {
    return this.tournamentContract.get();
  }
}
