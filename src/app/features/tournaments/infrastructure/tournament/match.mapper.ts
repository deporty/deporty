import { Injectable } from '@angular/core';
import { TeamMapper } from 'src/app/features/teams/infrastructure/team/team.mapper';
import { IMatchModel } from '../../models/match.model';
import { ScoreMapper } from './score.mapper';

@Injectable()
export class MatchMapper {
  constructor(
    private scoreMapper: ScoreMapper,
    private teamMapper: TeamMapper
  ) {}
  fromJson(obj: any): IMatchModel {
    return {
      score: obj['score'] ? this.scoreMapper.fromJson(obj['score']) : undefined,
      teamA: this.teamMapper.fromJson(obj['team-a']),
      teamB: this.teamMapper.fromJson(obj['team-b']),
      date: obj['date'] ? new Date(obj['date'].seconds * 1000) : undefined,
    };
  }

  toWeakJson(team: IMatchModel) {
    return {
      'team-a': this.teamMapper.toWeakJson( team.teamA),
      'team-b': this.teamMapper.toWeakJson( team.teamB),
      date: team.date,
      score: team.score ? this.scoreMapper.toJson(team.score) : null,
    };
  }
}
