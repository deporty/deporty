import { ITeamModel } from '@deporty/entities/teams';
import {
  IRegisteredTeamsModel,
  ITournamentModel
} from '@deporty/entities/tournaments';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetTeamByIdUsecase } from '../../../teams/usecases/get-team-by-id/get-team-by-id.usecase';
import { GetTournamentByIdUsecase } from '../get-tournament-by-id/get-tournament-by-id.usecase';
import { UpdateTournamentUsecase } from '../update-tournament/update-tournament.usecase';
import {
  TeamDoesNotHaveMembers,
  TeamWasAlreadyRegistered
} from './add-team-to-tournament.exceptions';

export interface Param {
  tournamentId: string;
  teamId: string;
}

export class AddTeamToTournamentUsecase extends Usecase<Param, IRegisteredTeamsModel> {
  constructor(
    private getTournamentByIdUsecase: GetTournamentByIdUsecase,
    private getTeamByIdUsecase: GetTeamByIdUsecase,
    private updateTournamentUsecase: UpdateTournamentUsecase
  ) {
    super();
  }

  call(param: Param): Observable<IRegisteredTeamsModel> {
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
          const register: IRegisteredTeamsModel = {
            enrollmentDate: new Date(),
            members: (team.members) || [],
            team: team,
          };
          tournament.registeredTeams.push(register);
          return this.updateTournamentUsecase.call(tournament).pipe(
            map((data: any) => {
              return register;
            })
          );
        } else {
          return throwError(new TeamWasAlreadyRegistered(team.name));
        }
      }),
      mergeMap((x) => x)
    );
  }
}
