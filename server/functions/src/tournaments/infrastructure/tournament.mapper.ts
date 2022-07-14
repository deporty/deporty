import { ITournamentModel } from '@deporty/entities/tournaments';
import { FixtureMapper } from './fixture.mapper';
import { RegisteredTeamMapper } from './registered-teams.mapper';
export class TournamentMapper {
  constructor(
    private registeredTeamMapper: RegisteredTeamMapper,
    private fixtureMapper: FixtureMapper
  ) {}
  fromJson(obj: any): ITournamentModel {
    return {
      id: obj['id'],
      name: obj['name'],
      flayer: obj['flayer'] || '',
      category: obj['category'] || '',
      reward: obj['reward'] || [],
      status: obj['status'] || '',
      description: obj['description'] || '',
      inscription: obj['inscription'] || 0,
      startsDate: obj['starts-date'] || '',
      fixture: obj['fixture']
        ? this.fixtureMapper.fromJson(obj['fixture'])
        : undefined,
      registeredTeams: !!obj['registered-teams']
        ? (obj['registered-teams'] as any[]).map((x) =>
            this.registeredTeamMapper.fromJson(x)
          )
        : [],
    };
  }
}
