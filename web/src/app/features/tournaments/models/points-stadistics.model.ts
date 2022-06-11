import { ITeamModel } from '../../teams/models/team.model';

export interface IPointsStadisticsModel {
  team: ITeamModel;
  playedMatches: number;
  wonMatches: number;
  tiedMatches: number;
  lostMatches: number;
  goalsInFavor: number;
  goalsAgainst: number;
  goalsDifference: number;
  goalsAgainstPerMatch: number;
  points: number;
}
