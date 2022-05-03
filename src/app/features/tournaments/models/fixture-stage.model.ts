import { IGroupModel } from './group.model';
import { IMatchModel } from './match.model';

export interface IFixtureStageModel {
  groups: IGroupModel[];
  order: number;
}
