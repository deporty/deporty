import { ITeamModel } from "../../teams/models/team.model";
import { IScoreModel } from "./score.mode";

export interface IMatchModel {
    teamA: ITeamModel;
    teamB: ITeamModel;
    score?: IScoreModel;
  }