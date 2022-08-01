import {
  IFixtureStageModel,
  IGroupModel,
  IMatchModel
} from '@deporty/entities/tournaments';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getDateFromSeconds } from '../../../core/helpers';
import { Usecase } from '../../../core/usecase';
import { GetTeamByIdUsecase } from '../../../teams/usecases/get-team-by-id/get-team-by-id.usecase';
import { existSMatchInList } from '../../helpers/match.helper';
import { GetTournamentByIdUsecase } from '../get-tournament-by-id/get-tournament-by-id.usecase';
import { UpdateTournamentUsecase } from '../update-tournament/update-tournament.usecase';
import {
  GroupDoesNotExist,
  MatchWasAlreadyRegistered,
  StageDoesNotExist
} from './add-match-to-group-inside-tournament.exceptions';


export interface Param {
  tournamentId: string;
  stageId: string;
  groupIndex: number;
  teamAId: string;
  teamBId: string;
  date: number;
}

export class AddMatchToGroupInsideTournamentUsecase extends Usecase<
  Param,
  IFixtureStageModel
> {
  constructor(
    private getTournamentByIdUsecase: GetTournamentByIdUsecase,
    private updateTournamentUsecase: UpdateTournamentUsecase,
    private getTeamByIdUsecase: GetTeamByIdUsecase
  ) {
    super();
  }

  call(param: Param): Observable<IFixtureStageModel> {
    const $teamA = this.getTeamByIdUsecase.call(param.teamAId);
    const $teamB = this.getTeamByIdUsecase.call(param.teamBId);
    const $tournament = this.getTournamentByIdUsecase.call(param.tournamentId);

    return zip($tournament, $teamA, $teamB).pipe(
      catchError((error) => throwError(error)),
      map((data) => {
        const tournament = data[0];
        const match = {
          teamA: data[1],
          teamB: data[2],
          date: param.date ? getDateFromSeconds(param.date) : undefined,
        } as IMatchModel;
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

        if (!currentGroup.matches) {
          currentGroup.matches = [];
        }

        const exist = existSMatchInList(
          match,
          currentGroup.matches as IMatchModel[]
        );
        if (!exist) {
          currentGroup.matches?.push(match);
        } else {
          return throwError(new MatchWasAlreadyRegistered(match));
        }
        return this.updateTournamentUsecase.call(tournament).pipe(
          map((t) => {
            return currentStage;
          })
        );
      }),
      mergeMap((x) => x)
    );
  }
}
