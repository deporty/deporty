import { IPlayerModel } from '../players';
import { ITeamModel } from '../teams/index';

export interface IRegisteredTeamsModel {
  enrollmentDate: Date;
  members: IPlayerModel[];
  team: ITeamModel;
}
