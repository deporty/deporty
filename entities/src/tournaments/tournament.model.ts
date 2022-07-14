import { IFixtureModel } from './fixture.model';
import { IRegisteredTeamsModel } from './registered-teams.model';

export interface ITournamentModel {
  id: string;
  name: string;
  status: 'in progress' | 'done' | 'canceled';
  description: string;
  reward: number[];
  category: string;
  regulation?: string;
  flayer: string;
  inscription: number;
  startsDate: Date;
  registeredTeams: IRegisteredTeamsModel[];
  fixture?: IFixtureModel;
}
