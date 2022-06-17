import { Injectable } from '@angular/core';
import { IPlayerModel } from '@deporty/entities/players';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '../../models/team.model';


export interface Param {
  team: ITeamModel;
  players: IPlayerModel[];
}

@Injectable()
export class AddPlayerToTeamUsecase extends BaseUsecase<Param, void> {
  constructor(private teamService: TeamAdapter) {
    super();
  }
  call(param: Param): Observable<void> {
    const team = param.team;
    if (!team.members) {
      team.members = [];
    }
    for (const player of param.players) {
      const isPresent =
        team.members.filter((x) => x.document == player.document).length > 0;
      if (!isPresent) {
        team.members.push(player);
      }
    }
    return this.teamService.updateTeam(team);
  }
}
