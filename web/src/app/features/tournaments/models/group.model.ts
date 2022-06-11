import { ITeamModel } from '../../teams/models/team.model';
import { IMatchModel } from './match.model';

export interface IGroupModel {
  matches?: IMatchModel[];
  teams: ITeamModel[];
  label: string;
  index: number;
}
