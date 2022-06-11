import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '../../models/team.model';

@Injectable()
export class DeleteTeamUsecase extends BaseUsecase<ITeamModel, void> {
  constructor(private teamAdapter: TeamAdapter) {
    super();
  }

  call(team: ITeamModel): Observable<void> {
    return this.teamAdapter.deleteTeam(team);
  }
}
