import { ITeamModel } from '@deporty/entities/teams';
import { Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { TeamContract } from '../../team.contract';
import { TeamDoesNotExist } from './get-team-by-id.exceptions';

export class GetTeamByIdUsecase extends Usecase<string, ITeamModel> {
  constructor(private teamContract: TeamContract) {
    super();
  }
  call(id: string): Observable<ITeamModel> {
    return this.teamContract.getByIdPopulate(id).pipe(
      map((team: ITeamModel | undefined) => {
        if (!!team) {
          return of(team);
        } else {
          return throwError(new TeamDoesNotExist(id));
        }
      }),
      mergeMap((x) => x)
    );
  }
}
