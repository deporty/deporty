import { ICreateTeamModel, ITeamModel } from '@deporty/entities/teams';
import { Observable, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { TeamContract } from '../../team.contract';
import { GetTeamByNameUsecase } from '../get-team-by-name/get-team-by-name.usecase';
import { TeamAlreadyExistsException } from './create-team.exceptions';

export class CreateTeamUsecase extends Usecase<ICreateTeamModel, string> {
  constructor(
    public teamContract: TeamContract,
    private getTeamByNameUsecase: GetTeamByNameUsecase
  ) {
    super();
  }
  call(team: ICreateTeamModel): Observable<string> {
    return this.getTeamByNameUsecase.call(team.name).pipe(
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
