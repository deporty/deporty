import { IFixtureStageModel } from '@deporty/entities/tournaments';
import { GroupMapper } from './group.mapper';

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
            .sort((a, b) => {
              return a.label > b.label ? 1: -1;
            })
        : [],
      order: obj['order'],
      id: obj['id'],
    };
  }


  toJson(fixtureStage: IFixtureStageModel) {
    
    return {
      order: fixtureStage.order,
      groups: !!fixtureStage.groups ? fixtureStage.groups.map((x) =>{

        return this.groupMapper.toJson(x)
      } 
      ) : [],
      id: fixtureStage.id
    };
  }

}
