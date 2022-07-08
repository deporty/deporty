import { ITeamModel } from '../teams/teams.model';
import { IMatchModel } from './match.model';

export interface IGroupModel {
  matches?: IMatchModel[];
  teams: ITeamModel[];
  label: string;
  index: number;
}
