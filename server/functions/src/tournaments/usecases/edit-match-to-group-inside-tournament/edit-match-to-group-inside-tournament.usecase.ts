import {
  IFixtureStageModel,
  IGroupModel,
  IMatchModel
} from '@deporty/entities/tournaments';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { existSMatchInList, findMatchInList } from '../../helpers/match.helper';
import { GetTournamentByIdUsecase } from '../get-tournament-by-id/get-tournament-by-id.usecase';
import { UpdateTournamentUsecase } from '../update-tournament/update-tournament.usecase';
import {
  GroupDoesNotExist,
  MatchDoesNotExist, StageDoesNotExist
} from './edit-match-to-group-inside-tournament.exceptions';

export interface Param {
  tournamentId: string;
  stageId: string;
  groupIndex: number;
  match: IMatchModel;
}

export class EditMatchToGroupInsideTournamentUsecase extends Usecase<
  Param,
  IFixtureStageModel
> {
  constructor(
    private getTournamentByIdUsecase: GetTournamentByIdUsecase,
    private updateTournamentUsecase: UpdateTournamentUsecase,
  ) {
    super();
  }

  call(param: Param): Observable<IFixtureStageModel> {
    const $tournament = this.getTournamentByIdUsecase.call(param.tournamentId);

    return $tournament.pipe(
      catchError((error) => throwError(error)),
      map((tournament) => {
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

        if (!!currentGroup.matches) {
          currentGroup.matches = [];
        }

        const exist = existSMatchInList(
          param.match,
          currentGroup.matches as IMatchModel[]
        );
        if (!exist) {
          return throwError(new MatchDoesNotExist());
        } else {
          const index = findMatchInList(
            param.match,
            currentGroup.matches as IMatchModel[]
          );
          (currentGroup.matches as IMatchModel[])[index] = param.match;
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
