import { ITeamModel } from '../../teams/models/team.model';
import { IPlayerFormModel } from './player-form.model';
import { IScoreModel } from './score.mode';
import { IStadisticsModel } from './stadistics.model';

export interface IMatchModel {
  teamA: ITeamModel;
  teamB: ITeamModel;
  score?: IScoreModel;
  date?: Date;
  playground?: string;
  stadistics?: IStadisticsModel;
  playerForm?: IPlayerFormModel;
}
