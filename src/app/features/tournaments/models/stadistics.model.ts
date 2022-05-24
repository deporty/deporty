export interface IStadisticsModel {
  teamA?: {
    [index: string]: {
      goals: any[];
      redCards: number[];
      yellowCards: number[];
    };
  };

  teamB?: {
    [index: string]: {
      goals: any[];
      redCards: number[];
      yellowCards: number[];
    };
  };
}
