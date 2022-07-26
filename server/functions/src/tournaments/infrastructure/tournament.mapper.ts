import { ITournamentModel } from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { Mapper } from '../../core/mapper';
import { FixtureMapper } from './fixture.mapper';
import { RegisteredTeamMapper } from './registered-teams.mapper';
export class TournamentMapper extends Mapper<ITournamentModel> {
  fromJsonWithOutId(obj: any): Omit<ITournamentModel, 'id'> {
    throw new Error('Method not implemented.');
  }
  toReferenceJson(obj: ITournamentModel) {
    throw new Error('Method not implemented.');
  }
  fromReferenceJson(obj: any): Observable<ITournamentModel> {
    return this.mapInsideReferences(obj);
  }
  constructor(
    private registeredTeamMapper: RegisteredTeamMapper,
    private fixtureMapper: FixtureMapper
  ) {
    super();
  }
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
        ? (obj['registered-teams'] as any[]).map((x) => {
            return this.registeredTeamMapper.fromJson(x);
          })
        : [],
    };
  }

  toJson(obj: ITournamentModel): any {
    return {
      id: obj.id,
      name: obj.name,
      flayer: obj.flayer,
      category: obj.category,
      reward: obj.reward,
      status: obj.status,
      description: obj.description,
      inscription: obj.inscription || 0,

      'registered-teams': !!obj.registeredTeams
        ? obj.registeredTeams.map((x) => {
            return this.registeredTeamMapper.toJson(x);
          })
        : [],

      fixture: !!obj.fixture ? this.fixtureMapper.toJson(obj.fixture) : {},
    };
  }
}
