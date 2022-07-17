import { ITeamModel } from '@deporty/entities/teams';
import { IRegisteredTeamsModel } from '@deporty/entities/tournaments';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetTeamsUsecase } from '../../../teams/usecases/get-teams/get-teams.usecase';
import { GetTournamentByIdUsecase } from '../get-tournament-by-id/get-tournament-by-id.usecase';

export class GetPosibleTeamsToAddUsecase extends Usecase<string, ITeamModel[]> {
  constructor(
    private getTeamsUsecase: GetTeamsUsecase,
    private getTournamentByIdUsecase: GetTournamentByIdUsecase
  ) {
    super();
  }
  call(tournamentId: string): Observable<ITeamModel[]> {
    const $teams = this.getTeamsUsecase.call();
    const $tournament = this.getTournamentByIdUsecase.call(tournamentId);

    return zip($teams, $tournament).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      map((data) => {
        const registeredTeamsId = data[1].registeredTeams.map(
          (item: IRegisteredTeamsModel) => {
            return item.team.id;
          }
        );
        const filteredTeams = data[0].filter((item) => {
          return registeredTeamsId.indexOf(item.id) < 0;
        });
        return filteredTeams;
      })
    );
  }
}
