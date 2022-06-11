import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '../../models/team.model';

@Injectable()
export class GetTeamsUsecase extends BaseUsecase<undefined, ITeamModel[]> {
  constructor(private teamAdapter: TeamAdapter) {
    super();
  }
  call(): Observable<ITeamModel[]> {
    return this.teamAdapter.getTeams();
  }
}
