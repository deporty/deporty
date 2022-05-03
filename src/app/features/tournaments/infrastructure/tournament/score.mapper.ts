import { Injectable } from '@angular/core';
import { IScoreModel } from '../../models/score.mode';

@Injectable()
export class ScoreMapper {
  fromJson(obj: any): IScoreModel {
    return {
      teamA: obj['team-a'],
      teamB: obj['team-b'],
    };
  }
}
