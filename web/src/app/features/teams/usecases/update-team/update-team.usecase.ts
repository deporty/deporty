import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '../../models/team.model';

@Injectable()
export class UpdateTeamUsecase extends BaseUsecase<ITeamModel, any> {
  constructor(private teamService: TeamAdapter) {
    super();
  }
  call(team: ITeamModel): Observable<any> {
    return this.teamService.updateTeam(team);
  }
}
