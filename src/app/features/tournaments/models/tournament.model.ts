import { ITeamModel } from "../../teams/models/team.model";
import { IFixtureModel } from "./fixture.model";

export interface ITournamentModel {
  id: string,
  name: string;
  status: 'in progress' | 'done' | 'canceled'
  description: string;
  reward: number[];
  category: string;
  regulation?: string;
  flayer: string;
  inscription: number;
  startsDate: Date;
  teams: ITeamModel[],
  fixture?: IFixtureModel
}
