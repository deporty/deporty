import { Injectable } from '@angular/core';
import { IFixtureModel } from '../../models/fixture.model';
import { FixtureStageMapper } from './fixture-stage.mapper';

@Injectable()
export class FixtureMapper {
  constructor(private fixtureStageMapper: FixtureStageMapper) {}

  fromJson(obj: any): IFixtureModel {
    return {
      stages: (obj['fixture-stages'] as []).map(
        this.fixtureStageMapper.fromJson
      ),
      tournamentBracket: obj['tournamentBracket'],
    };
  }
}
