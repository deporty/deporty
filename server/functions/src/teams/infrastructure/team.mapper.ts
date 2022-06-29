import { ITeamModel } from '@deporty/entities/teams';
import { Mapper } from '../../core/mapper';
// import { PlayerMapper } from '../../players/infrastructure/player.mapper';

export class TeamMapper extends Mapper<ITeamModel> {
  constructor(
    // private playerMapper: PlayerMapper
    ) {
    super();
  }

  fromJsonWithOutId(obj: any): Omit<ITeamModel, 'id'> {
    throw new Error('Method not implemented.');
  }

  fromJson(obj: any): ITeamModel {
    return {
      name: obj['name'],
      id: obj['id'],
      athem: obj['athem'],
      // members: obj['members']
      //   ? (obj['members'] as []).map((item) => {
      //       const obj = this.playerMapper.fromJson(item);
      //       return obj;
      //     })
      //   : [],
      members: obj['members'],

      shield: obj['shield'],
      agent: obj['agent'],
    };
  }

  toJson(team: ITeamModel) {
    return {
      name: team.name,
      athem: team.athem || '',
      members: team.members
        ? (team.members as []).map((member) => {
            return member;
          })
        : [],
      shield: team.shield || '',
      agent: team.agent || '',
    };
  }

  toWeakJson(team: ITeamModel) {
    return {
      name: team.name,
      id: team.id || '',
      shield: team.shield || '',
    };
  }
}
