import { IPlayerModel } from 'src/app/features/players/domain/models/player.model';


// export interface IPlayerModel {
//     name: string;
//     lastName: string;
//     id: string;

// }

export interface Member extends IPlayerModel {
  ingressDate: Date;
  retirementDate?: Date;
  position: string;
}
type Members = Member[];
export interface ITeamModel {
  name: string;
  athem: string;
  members: Members;
}
