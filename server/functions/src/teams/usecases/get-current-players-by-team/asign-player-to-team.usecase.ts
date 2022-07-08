import { IPlayerModel } from '@deporty/entities/players';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { TeamContract } from '../../team.contract';
import { GetTeamByIdUsecase } from '../get-team-by-id/get-team-by-id.usecase';

export interface IAsignPlayerToTeam {
  teamName: string;
  player: IPlayerModel;
}

export class GetCurrentPlayersByTeam extends Usecase<string, IPlayerModel[]> {
  constructor(
    public teamContract: TeamContract,
    private getTeamByIdUsecase: GetTeamByIdUsecase,
  ) {
    super();
  }
  call(teamId: string): any {
    const $team = this.getTeamByIdUsecase.call(teamId);

    $team.pipe(
      catchError((error) => {
        return throwError(error);
      }),
      map((team) => {})
    );
  }
}
