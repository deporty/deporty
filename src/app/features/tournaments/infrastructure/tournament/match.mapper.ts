import { Injectable } from '@angular/core';
import { IMatchModel } from '../../models/match.model';
import { ScoreMapper } from './score.mapper';

@Injectable()
export class MatchMapper {
  constructor(private scoreMapper: ScoreMapper) {}
  fromJson(obj: any): IMatchModel {
    return {
      score: obj['score'] ?  this.scoreMapper.fromJson(obj['score']): undefined,
      teamA: obj['team-a'],
      teamB: obj['team-b'],
    };
  }
}
