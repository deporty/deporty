import { IFixtureModel } from '@deporty/entities/tournaments';
import { FixtureStageMapper } from './fixture-stage.mapper';

export class FixtureMapper {
  constructor(private fixtureStageMapper: FixtureStageMapper) {}

  fromJson(obj: any): IFixtureModel {
    return {
      stages: (obj['fixture-stages'] as []).map((s) => {
        return this.fixtureStageMapper.fromJson(s);
      }),
      tournamentBracket: obj['tournament-bracket'],
    };
  }
  toJson(fixture: IFixtureModel) {
    return {
      'fixture-stages': fixture.stages.map((x) => {
        return this.fixtureStageMapper.toJson(x);
      }),
      'tournament-bracket': fixture.tournamentBracket
    };
  }
}
