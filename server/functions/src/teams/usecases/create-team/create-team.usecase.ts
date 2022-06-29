import { ITeamModel } from '@deporty/entities/teams';
import { Observable, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { TeamContract } from '../../team.contract';
import { GetTeamByIdUsecase } from '../get-team-by-id/get-team-by-id.usecase';
import { TeamAlreadyExistsException } from './create-team.exceptions';

export class CreateTeamUsecase extends Usecase<ITeamModel, string> {
  constructor(
    public teamContract: TeamContract,
    private getTeamByIdUsecase: GetTeamByIdUsecase
  ) {
    super();
  }
  call(team: ITeamModel): Observable<string> {
    return this.getTeamByIdUsecase.call(team.name).pipe(
      map((teamPrev: ITeamModel | undefined) => {
        if (teamPrev) {
          return throwError(new TeamAlreadyExistsException(teamPrev.name));
        } else {
          return this.teamContract.save(team);
        }
      }),
      mergeMap((x) => x)
    );
  }
}
