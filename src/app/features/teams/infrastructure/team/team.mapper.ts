import { Injectable } from '@angular/core';
import { PlayerMapper } from 'src/app/features/players/infrastructure/player/player.mapper';
import { IPlayerModel } from 'src/app/features/players/models/player.model';
import { ITeamModel } from '../../models/team.model';
@Injectable()
export class TeamMapper {
  constructor(private playerMapper: PlayerMapper) {}

  fromJson(obj: any): ITeamModel {
    return {
      name: obj['name'],
      id: obj['id'],
      athem: obj['athem'],
      members: obj['members']
        ? (obj['members'] as []).map((item) => {
            const obj = this.playerMapper.fromJson(item);
            return obj;
          })
        : [],
      shield: obj['shield'],
      agent: obj['agent'],
    };
  }

  toJsonDB(team: ITeamModel) {
    return {
      name: team.name,
      athem: team.athem || '',
      members: team.members
        ? (team.members as []).map((member) => {
            return this.playerMapper.toJson(member);
          })
        : [],
      shield: team.shield || '',
      agent: team.agent || '',
    };
  }
}
