import { IGroupModel } from '@deporty/entities/tournaments';
import { TeamMapper } from '../../teams/infrastructure/team.mapper';
import { MatchMapper } from './match.mapper';

export class GroupMapper {
  constructor(
    private matchMapper: MatchMapper,
    private teamMapper: TeamMapper
  ) {}
  fromJson(obj: any): IGroupModel {
    return {
      matches: obj['matches']
        ? (obj['matches'] as []).map((x) => this.matchMapper.fromJson(x))
        : undefined,
      teams: obj['teams']
        ? (obj['teams'] as []).map((x) => this.teamMapper.fromJson(x))
        : [],
      label: obj['label'],
      index: obj['index'],
    };
  }

  toJson(group: IGroupModel) {
    return {
      label: group.label,
      matches: group.matches || [],
      teams: group.teams.map((x) => this.teamMapper.toWeakJson(x)) || [],
    };
  }
}
