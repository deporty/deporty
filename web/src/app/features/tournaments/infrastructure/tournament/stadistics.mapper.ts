import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { IStadisticsModel } from '../../models/stadistics.model';

@Injectable()
export class StadisticsMapper {
  fromJson(obj: any): IStadisticsModel {
    const response: IStadisticsModel = {};
    function transform(response: IStadisticsModel, obj: any, team: string,teamObj: string) {
      if (team in obj) {
        (response as any)[teamObj] = {}
        for (const id in obj[team]) {
          if (Object.prototype.hasOwnProperty.call(obj[team], id)) {
            const element = obj[team][id];

            (response as any)[teamObj][id] = {
              goals: [],
              redCards: element['red-cards'],
              yellowCards: element['yellow-cards'],
            } as any;

            for (const goal of element['goals']) {
              (response as any)[teamObj][id]['goals'].push({
                kindGoal: goal['kind-goal'] as string,
                minute: goal['minute'] as number,
              });
            }
          }
        }
      }
    }

    transform(response, obj, 'team-a','teamA');
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
