import { ITeamModel } from '../teams/teams.model';
import { IFixtureStageModel } from './fixture-stage.model';



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
