import { Injectable } from '@angular/core';
import { IFixtureStageModel } from '../../models/fixture-stage.model';
import { GroupMapper } from './group.mapper';
import { MatchMapper } from './match.mapper';

@Injectable()
export class FixtureStageMapper {
  constructor(private groupMapper: GroupMapper) {}

  fromJson(obj: any): IFixtureStageModel {
    return {
      groups: obj['groups']
        ? (obj['groups'] as [])
            .map((x: any, index: number) => {
              return {
                ...x,
                index,
              };
            })
            .map((x) => this.groupMapper.fromJson(x))
        : [],
      order: obj['order'],
    };
  }
}
