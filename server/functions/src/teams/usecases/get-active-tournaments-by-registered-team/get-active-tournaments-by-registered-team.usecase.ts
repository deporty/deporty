import { ITournamentModel } from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { TeamContract } from '../../team.contract';
import { TournamentContract } from '../../../tournaments/tournament.contract';

export class GetActiveTournamentsByRegisteredTeamUsecase extends Usecase<
  string,
  ITournamentModel[]
> {
  constructor(
    public teamContract: TeamContract,
    private tournamentContract: TournamentContract
  ) {
    super();
  }
  call(teamId: string): Observable<ITournamentModel[]> {
    return this.tournamentContract.get().pipe(
      map((tournaments: ITournamentModel[]) => {
        return tournaments.filter((tournament) => {
          return !!tournament.registeredTeams
            ? tournament.registeredTeams.filter((x) => {
                return x.team.id === teamId;
              }).length > 0
            : false && tournament.status == 'in progress';
        });
      })
    );
  }
}
