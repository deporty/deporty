import {
  IStadisticsModel,
  IStadisticSpecificationModel,
} from '@deporty/entities/tournaments';
import { PlayerMapper } from '../../players/infrastructure/player.mapper';

export class StadisticsMapper {
  constructor(private playerMapper: PlayerMapper) {}
  fromJson(obj: any): IStadisticsModel {
    const response: IStadisticsModel = {};
    const transform = (
      response: IStadisticsModel,
      stadistic: any,
      teamLabel: 'team-a' | 'team-b',
      teamObj: 'teamA' | 'teamB'
    ) => {
      if (teamLabel in stadistic) {
        response[teamObj] = [];

        for (const playerStadistic of stadistic[teamLabel]) {
          const tempObj: IStadisticSpecificationModel = {
            player: this.playerMapper.fromJson(playerStadistic.player),
            goals: [],
            totalGoals: playerStadistic['total-goals'] as number,
            redCards: playerStadistic['red-cards'],
            yellowCards: playerStadistic['yellow-cards'],
            totalYellowCards: playerStadistic['total-yellow-cards'],
            totalRedCards: playerStadistic['total-red-cards'],
          };
          (response as any)[teamObj].push(tempObj);
          if (!!playerStadistic['goals']) {
            for (const goal of playerStadistic['goals']) {
              (tempObj as any)['goals'].push({
                kind: goal['kind'] as string,
                minute: goal['minute'] as number,
              });
            }
          }
        }
      }
    };

    transform(response, obj, 'team-a', 'teamA');
    transform(response, obj, 'team-b', 'teamB');
    return response;
  }

  toJson(stadistics: IStadisticsModel) {
    let response: any = {};

    const transform = (data: IStadisticSpecificationModel[]) => {
      let res: any[] = [];

      for (const specification of data) {
        const temp: any = {
          goals: [],
          'red-cards': specification.redCards,
          'yellow-cards': specification.yellowCards,
          'total-goals': specification.totalGoals,
          'total-red-cards': specification.totalRedCards,
          'total-yellow-cards': specification.totalYellowCards,
          player: this.playerMapper.toReferenceJson(specification.player),
        };

        if (!specification['goals']) {
          specification['goals'] = [];
        }
        for (const goal of specification['goals']) {
          temp['goals'].push({
            kind: goal.kind,
            minute: goal.minute,
          });
        }
        res.push(temp);
      }
      return res;
    };

    response['team-a'] = transform(stadistics.teamA || []);
    response['team-b'] = transform(stadistics.teamB || []);

    return response;
  }
}
