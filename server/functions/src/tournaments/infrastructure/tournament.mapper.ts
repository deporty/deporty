import { ITournamentModel } from '@deporty/entities/tournaments';
import { TeamMapper } from '../../teams/infrastructure/team.mapper';
import { FixtureMapper } from './fixture.mapper';
export class TournamentMapper {
  constructor(
    private teamMapper: TeamMapper,
    private fixtureMapper: FixtureMapper
  ) {}
  fromJson(obj: any): ITournamentModel {
    return {
      id: obj['id'],
      name: obj['name'],
      flayer: obj['flayer'],
      category: obj['category'],
      reward: obj['reward'],
      status: obj['status'],
      description: obj['description'],
      inscription: obj['inscription'],
      regulation: obj['regulation'],
      startsDate: obj['starts-date'],
      fixture: obj['fixture']
        ? this.fixtureMapper.fromJson(obj['fixture'])
        : undefined,
      teams: obj['teams']
        ? (obj['teams'] as any[]).map((x) => this.teamMapper.fromJson(x))
        : [],
    };
  }
}
