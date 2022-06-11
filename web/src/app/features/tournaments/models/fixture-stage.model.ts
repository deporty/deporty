import { IGroupModel } from './group.model';

export interface IFixtureStageModel {
  id?: string;
  groups: IGroupModel[];
  order: number;
}
