import { IPlayerModel } from '@deporty/entities/players';



export interface Member extends Partial<IPlayerModel> {
  ingressDate?: Date;
  retirementDate?: Date;
  position?: string;
}
type Members = Member[];
export interface ITeamModel {
  id: string;
  name: string;
  athem?: string;
  shield?: string;
  members?: Members;
  agent?: string;
}
