import { IMemberModel, ITeamModel } from '../teams/index';

export interface IRegisteredTeamsModel {
  enrollmentDate: Date;
  members: IMemberModel[];
  team: ITeamModel;
}
