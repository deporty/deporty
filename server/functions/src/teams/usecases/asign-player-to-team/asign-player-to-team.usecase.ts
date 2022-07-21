import { IPlayerModel } from '@deporty/entities/players';
import { IMemberModel, ITeamModel } from '@deporty/entities/teams';
import { ITournamentModel } from '@deporty/entities/tournaments';
import { Observable, of, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetPlayerByIdUsecase } from '../../../players/usecases/get-player-by-id/get-player-by-id.usecase';
import { UpdateTournamentUsecase } from '../../../tournaments/usecases/update-tournament/update-tournament.usecase';
import { TeamContract } from '../../team.contract';
import { GetActiveTournamentsByRegisteredTeamUsecase } from '../get-active-tournaments-by-registered-team/get-active-tournaments-by-registered-team.usecase';
import { GetTeamByIdUsecase } from '../get-team-by-id/get-team-by-id.usecase';
import { PlayerIsAlreadyInTeamException } from './asign-player-to-team.exceptions';

export interface IAsignPlayerToTeam {
  teamId: string;
  playerId: string;
}

export class AsignPlayerToTeamUsecase extends Usecase<
  IAsignPlayerToTeam,
  IMemberModel
> {
  constructor(
    public teamContract: TeamContract,
    private getTeamByIdUsecase: GetTeamByIdUsecase,
    private getPlayerByIdUsecase: GetPlayerByIdUsecase,
    private updateTournamentUsecase: UpdateTournamentUsecase,
    private getActiveTournamentsByRegisteredTeamUsecase: GetActiveTournamentsByRegisteredTeamUsecase
  ) {
    super();
  }
  call(param: IAsignPlayerToTeam): Observable<IMemberModel> {
    const $getPlayerByIdUsecase = this.getPlayerByIdUsecase.call(
      param.playerId
    );

    const $getTeamByIdUsecase = this.getTeamByIdUsecase.call(param.teamId);

    return zip($getPlayerByIdUsecase, $getTeamByIdUsecase).pipe(
      catchError((error: any) => {
        return throwError(error);
      }),
      map((_zip: any[]) => {
        const player = _zip[0] as IPlayerModel;
        const team = _zip[1] as ITeamModel;

        if (team.members == undefined) {
          team.members = [];
        }
        const existsPlayer =
          team.members.filter((p: IMemberModel) => {
            return p.id === player.id;
          }).length > 0;
        if (!existsPlayer) {
          const newMember: IMemberModel = {
            ...player,
            initDate: new Date(),
            role: '',
          };

          team.members.push(newMember);

          const $tournamentsByRegisteredTeams =
            this.getActiveTournamentsByRegisteredTeamUsecase.call(team.id);

          const $teamUpdated = this.teamContract.update(team.id, team);
          return zip($teamUpdated, $tournamentsByRegisteredTeams).pipe(
            map((data) => {
              const tournaments: ITournamentModel[] = data[1];

              const $tournamentsUpdated = [];
              for (const tournament of tournaments) {
                for (let j = 0; j < tournament.registeredTeams.length; j++) {
                  const registeredTeam = tournament.registeredTeams[j];

                  if (registeredTeam.team.id == team.id) {
                    if (!registeredTeam.team.members) {
                      registeredTeam.team.members = [];
                    }
                    tournament.registeredTeams[j].members.push(
                      newMember as IPlayerModel
                    );
                  }
                }

                $tournamentsUpdated.push(
                  this.updateTournamentUsecase.call(tournament)
                );
              }
              if ($tournamentsUpdated.length > 0) {
                return zip(...$tournamentsUpdated).pipe(
                  map(() => {
                    return newMember;
                  })
                );
              } else {
                return of(newMember);
              }
            }),
            mergeMap((x) => x)
          );
        } else {
          return throwError(
            new PlayerIsAlreadyInTeamException(player.document)
          );
        }
      }),
      mergeMap((x) => x)
    );
  }
}
