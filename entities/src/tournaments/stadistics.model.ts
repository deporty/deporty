import { IPlayerModel } from '../players';
export interface ICardSpecification {
  minute: number;
  description: string;
}

export interface IGoalSpecification {
  minute: number;
  kind: string;
}

export interface IStadisticSpecificationModel {
  player: IPlayerModel;

  goals?: IGoalSpecification[];
  totalGoals: number;

  redCards: ICardSpecification[];
  totalRedCards: number;

  yellowCards: ICardSpecification[];
  totalYellowCards: number;
}

export interface IStadisticsModel {
  teamA?: IStadisticSpecificationModel[];
  teamB?: IStadisticSpecificationModel[];
  globalStadisticsTeamA?: Omit<IStadisticSpecificationModel, 'player'>;
  globalStadisticsTeamB?: Omit<IStadisticSpecificationModel, 'player'>;
}
