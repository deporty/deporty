import { ITeamModel } from '@deporty/entities/teams';
import {
  IFixtureStageModel,
  IGroupModel,
  ITournamentModel,
} from '@deporty/entities/tournaments';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetTeamByIdUsecase } from '../../../teams/usecases/get-team-by-id/get-team-by-id.usecase';
import {
  GroupDoesNotExist,
  StageDoesNotExist,
} from '../add-match-to-group-inside-tournament/add-match-to-group-inside-tournament.exceptions';
import { GetTournamentByIdUsecase } from '../get-tournament-by-id/get-tournament-by-id.usecase';
import { UpdateTournamentUsecase } from '../update-tournament/update-tournament.usecase';
import {
  TeamDoesNotHaveMembers,
  TeamIsAlreadyInTheGroup,
} from './add-team-to-group-inside-tournament.exceptions';

export interface Param {
  tournamentId: string;
  stageId: string;
  groupIndex: number;
  teamId: string;
}

export class AddTeamToGroupInsideTournamentUsecase extends Usecase<
  Param,
  IGroupModel
> {
  constructor(
    private getTournamentByIdUsecase: GetTournamentByIdUsecase,
    private getTeamByIdUsecase: GetTeamByIdUsecase,
    private updateTournamentUsecase: UpdateTournamentUsecase
  ) {
    super();
  }

  call(param: Param): Observable<IGroupModel> {
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

        const stage: IFixtureStageModel[] = tournament.fixture?.stages.filter(
          (stage) => stage.id == param.stageId
        ) as IFixtureStageModel[];
        if (stage?.length === 0) {
          return throwError(new StageDoesNotExist(param.stageId));
        }
        const currentStage: IFixtureStageModel =
          stage.pop() as IFixtureStageModel;

        const group: IGroupModel[] = currentStage.groups.filter(
          (g) => g.index === param.groupIndex
        );

        if (group.length === 0) {
          return throwError(new GroupDoesNotExist(param.groupIndex));
        }

        const currentGroup: IGroupModel = group.pop() as IGroupModel;
        const exists =
          currentGroup.teams.filter((x) => x.id === team.id).length > 0;
        if (exists) {
          return throwError(new TeamIsAlreadyInTheGroup(team.name));
        }
        currentGroup.teams.push(team);

        return this.updateTournamentUsecase.call(tournament).pipe(
          map((data: any) => {
            return currentGroup;
          })
        );
      }),
      mergeMap((x) => x)
    );
  }
}
