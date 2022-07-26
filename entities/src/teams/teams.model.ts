import { IPlayerModel } from '../players';

export interface IMemberModel {
  initDate?: Date;
  retirementDate?: Date;
  role?: string;
  player: IPlayerModel;
}
type Members = IMemberModel[];
export interface ITeamModel {
  id: string;
  name: string;
  athem?: string;
  shield?: string;
  members?: Members;
  agent?: string;
}
export type ICreateTeamModel = Omit<ITeamModel, 'id'>;
