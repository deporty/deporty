import { ITeamModel } from '../../teams/models/team.model';
import { IFixtureStageModel } from './fixture-stage.model';
import { IMatchModel } from './match.model';



export interface IKey {
  teams: ITeamModel[];
  keys: IKey[];
}



export interface ITournamentBracket {
  final: IKey;
}
export interface IFixtureModel {
  stages: IFixtureStageModel[];
  tournamentBracket: ITournamentBracket;
}
