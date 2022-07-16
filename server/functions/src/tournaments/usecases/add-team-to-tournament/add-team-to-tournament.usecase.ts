import { IPlayerModel } from '@deporty/entities/players';
import { ITeamModel } from '@deporty/entities/teams';
import { ITournamentModel } from '@deporty/entities/tournaments';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetTeamByIdUsecase } from '../../../teams/usecases/get-team-by-id/get-team-by-id.usecase';
import { GetTournamentByIdUsecase } from '../get-tournament-by-id/get-tournament-by-id.usecase';
import { UpdateTournamentUsecase } from '../update-tournament/update-tournament.usecase';
import {
  TeamDoesNotHaveMembers,
  TeamWasAlreadyRegistered,
} from './add-team-to-tournament.exceptions';

export interface Param {
  tournamentId: string;
  teamId: string;
}

export class AddTeamToTournamentUsecase extends Usecase<Param, void> {
  constructor(
    private getTournamentByIdUsecase: GetTournamentByIdUsecase,
    private getTeamByIdUsecase: GetTeamByIdUsecase,
    private updateTournamentUsecase: UpdateTournamentUsecase
  ) {
    super();
  }

  call(param: Param): Observable<void> {
    const $team = this.getTeamByIdUsecase.call(param.teamId);
    const $tournament = this.getTournamentByIdUsecase.call(param.tournamentId);
    return zip($team, $tournament).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      map((data) => {
        const team: ITeamModel = data[0];

        if (team.members?.length == 0) {
          return throwError(new TeamDoesNotHaveMembers(team.name));
        }
        const tournament: ITournamentModel = data[1];

        const registeredTeams = tournament.registeredTeams;
        const exists =
          registeredTeams.filter((t) => {
            return t.team.id === team.id;
          }).length > 0;

        if (!exists) {
          tournament.registeredTeams.push({
            enrollmentDate: new Date(),
            members: (team.members as IPlayerModel[]) || [],
            team: team,
          });
          return this.updateTournamentUsecase.call(tournament);
        } else {
          return throwError(new TeamWasAlreadyRegistered(team.name));
        }
      }),
      mergeMap((x) => x)
    );
  }
}
