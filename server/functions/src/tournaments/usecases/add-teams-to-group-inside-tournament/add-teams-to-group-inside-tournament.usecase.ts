import { ITeamModel } from '@deporty/entities/teams';
import {
  IFixtureStageModel,
  IGroupModel,
  ITournamentModel,
} from '@deporty/entities/tournaments';
import { from, Observable, of, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap, reduce, tap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetTeamByIdUsecase } from '../../../teams/usecases/get-team-by-id/get-team-by-id.usecase';
import {
  GroupDoesNotExist,
  StageDoesNotExist,
} from '../add-match-to-group-inside-tournament/add-match-to-group-inside-tournament.exceptions';
import { TeamIsAlreadyInTheGroup } from '../add-team-to-group-inside-tournament/add-team-to-group-inside-tournament.exceptions';
import { AddTeamToGroupInsideTournamentUsecase } from '../add-team-to-group-inside-tournament/add-team-to-group-inside-tournament.usecase';
import { GetTournamentByIdUsecase } from '../get-tournament-by-id/get-tournament-by-id.usecase';
import { UpdateTournamentUsecase } from '../update-tournament/update-tournament.usecase';
import {
  TeamDoesNotHaveMembers,
  TeamIsAlreadyInOtherGroup,
} from './add-team-to-group-inside-tournament.exceptions';
// import { TeamDoesNotHaveMembers } from './add-team-to-group-inside-tournament.exceptions';

export interface Param {
  tournamentId: string;
  stageId: string;
  groupIndex: number;
  teamIds: string[];
}

export class AddTeamsToGroupInsideTournamentUsecase extends Usecase<
  Param,
  IGroupModel
> {
  constructor(
    private getTournamentByIdUsecase: GetTournamentByIdUsecase,
    private getTeamByIdUsecase: GetTeamByIdUsecase,
    private updateTournamentUsecase: UpdateTournamentUsecase,
    private addTeamToGroupInsideTournamentUsecase: AddTeamToGroupInsideTournamentUsecase
  ) {
    super();
  }

  call(param: Param): Observable<any> {
    const $teams: Observable<any>[] = param.teamIds.map((tid) =>
      this.getTeamByIdUsecase.call(tid).pipe(
        catchError((x) => {
          return of({
            teamId: tid,
            error: x,
          });
        }),
        tap((data) => {})
      )
    );

    return zip(...$teams).pipe(
      map((data: (ITeamModel | Error)[]) => {
        const teams: (ITeamModel | any)[] = data;

        const response: any = {};
        const newTeams = [];
        for (const team of teams) {
          if (!!team['teamId']) {
            response[team['teamId']] = team['error'].message;
          } else {
            if (team.members?.length == 0) {
              response[team.id] = new TeamDoesNotHaveMembers(team.name);
            } else {
              newTeams.push(team);
            }
          }
        }
        return {
          teams: response,
          group: {},
          newTeams,
        };
      }),
      map((data) => {
        const $tournament = this.getTournamentByIdUsecase.call(
          param.tournamentId
        );
        const $data = of(data);
        return zip($tournament, $data).pipe(
          map((res: any) => {
            return {
              tournament: res[0],
              ...res[1],
            };
          })
        );
      }),
      mergeMap((x) => x),
      map((data) => {
        const tournament: ITournamentModel = data['tournament'];
        const stage: IFixtureStageModel[] = tournament.fixture?.stages.filter(
          (stage) => stage.id == param.stageId
        ) as IFixtureStageModel[];
        if (stage?.length === 0) {
          return throwError(new StageDoesNotExist(param.stageId));
        }
        const currentStage: IFixtureStageModel =
          stage.pop() as IFixtureStageModel;
        const group: IGroupModel[] = currentStage.groups.filter(
          (g) => g.order === param.groupIndex
        );
        if (group.length === 0) {
          return throwError(new GroupDoesNotExist(param.groupIndex));
        }
        const currentGroup: IGroupModel = group.pop() as IGroupModel;

        for (const team of data.newTeams) {
          const exists =
            currentGroup.teams.filter((x) => x.id === team.id).length > 0;
          if (exists) {
            data.teams[team.id] = new TeamIsAlreadyInTheGroup(
              team.name
            ).message;
            // return throwError(new TeamIsAlreadyInTheGroup(team.name));
          } else {
            const otherGroup: IGroupModel[] = currentStage.groups.filter(
              (g) => g.order != param.groupIndex
            );
            let isInAnotherGroup = false;
            for (const g of otherGroup) {
              isInAnotherGroup =
                isInAnotherGroup ||
                g.teams.filter((x) => x.id === team.id).length > 0;
            }

            if (isInAnotherGroup) {
              data.teams[team.id] = new TeamIsAlreadyInOtherGroup(team.name);
            } else {
              currentGroup.teams.push(team);
              data.teams[team.id] = 'SUCCESS';
            }
          }
        }

        // return of({
        //   group: currentGroup,
        //   results: data.teams,
        //   tournament
        // });
        return this.updateTournamentUsecase.call(tournament).pipe(
          map((res: any) => {
            return {
              group: currentGroup,
              results: data.teams,
            };
          })
        );
      }),
      mergeMap((x) => x)
    );
  }
  call2(param: Param): Observable<any> {
    type snapshotGroup = {
      group: IGroupModel | Error;
      teamId: string;
    };

    const $teamsAdded: Observable<snapshotGroup>[] = param.teamIds.map((x) => {
      return this.addTeamToGroupInsideTournamentUsecase
        .call({
          tournamentId: param.tournamentId,
          stageId: param.stageId,
          groupIndex: param.groupIndex,
          teamId: x,
        })
        .pipe(
          catchError((x: Error) => of(x)),

          map((g) => {
            return {
              group: g,
              teamId: x,
            };
          })
        );
    });
    return from($teamsAdded).pipe(
      mergeMap((x) => x),
      reduce(
        (acc, x: snapshotGroup) => {
          console.log(x, 'Raibow');

          if (x.group instanceof Error) {
            (acc as any).results[(x as any).teamId] = (x as any).group;
          } else {
            (acc as any).results[(x as any).teamId] = 'SUCCESS';
          }
          const tempo = (acc.group as any).teams.filter(
            (t: any) => t.id === (x as any).teamId
          );
          const exists = tempo.length > 0;
          if (!exists) {
            (acc.group as any).teams.push(tempo);
          }
          return acc;
        },
        { group: { teams: [] }, results: {} }
      ),
      map((x) => x)
    );
  }
}
