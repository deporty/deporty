import { IStadisticsModel } from '@deporty/entities/tournaments';
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
          const tempObj: any = {
            player: this.playerMapper.fromJson(playerStadistic.player),
            goals: [],
            totalGoals: playerStadistic['total-goals'] as number,
            redCards: playerStadistic['red-cards'],
            yellowCards: playerStadistic['yellow-cards'],
          };
          (response as any)[teamObj].push(tempObj);
          if (!!playerStadistic['goals']) {
            for (const goal of playerStadistic['goals']) {
              tempObj['goals'].push({
                kindGoal: goal['kind-goal'] as string,
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

    function transform(data: any) {
      let response: any = {};

      for (const id in data) {
        if (Object.prototype.hasOwnProperty.call(data, id)) {
          const element = data[id];

          response[id] = {
            goals: [],
            'red-cards': element['redCards'],
            'yellow-cards': element['yellowCards'],
          };

          for (const goal of element['goals']) {
            response[id]['goals'].push({
              'kind-goal': goal['kindGoal'],
              minute: goal['minute'],
            });
          }
        }
      }
      return response;
    }

    response['team-a'] = transform(stadistics.teamA || {});
    response['team-b'] = transform(stadistics.teamB || {});

    return response;
  }
}
