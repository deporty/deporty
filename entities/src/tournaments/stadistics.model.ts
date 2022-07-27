import { IPlayerModel } from '../players';

export interface IStadisticSpecificationModel {
  player: IPlayerModel;
  goals?: any[];
  totalGoals: number;
  redCards: number[];
  yellowCards: number[];
}

export interface IStadisticsModel {
  teamA?: IStadisticSpecificationModel[];
  teamB?: IStadisticSpecificationModel[];
  globalStadisticsTeamA?: Omit<IStadisticSpecificationModel, 'player'>;
  globalStadisticsTeamB?: Omit<IStadisticSpecificationModel, 'player'>;
}
