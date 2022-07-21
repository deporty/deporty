import { IPlayerModel } from '../players';

export interface IMemberModel extends Partial<IPlayerModel> {
  initDate?: Date;
  retirementDate?: Date;
  role?: string;
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
export type ICreateTeamModel = Omit<ITeamModel, "id">;
