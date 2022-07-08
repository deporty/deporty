import { IScoreModel } from '@deporty/entities/tournaments';

export class ScoreMapper {
  fromJson(obj: any): IScoreModel {
    return {
      teamA: obj['team-a'],
      teamB: obj['team-b'],
    };
  }

  toJson(score: IScoreModel) {
    return {
      'team-a': score.teamA,
      'team-b': score.teamB,
    };
  }
}
