import { Injectable } from '@angular/core';
import { TeamMapper } from 'src/app/features/teams/infrastructure/team/team.mapper';
import { IMatchModel } from '../../models/match.model';
import { PlayerFormMapper } from './player-form.mapper';
import { ScoreMapper } from './score.mapper';
import { StadisticsMapper } from './stadistics.mapper';

@Injectable()
export class MatchMapper {
  constructor(
    private scoreMapper: ScoreMapper,
    private teamMapper: TeamMapper,
    private stadisticsMapper: StadisticsMapper,
    private playerFormMapper: PlayerFormMapper
  ) {}
  fromJson(obj: any): IMatchModel {
    return {
      score: obj['score'] ? this.scoreMapper.fromJson(obj['score']) : undefined,
      teamA: this.teamMapper.fromJson(obj['team-a']),
      teamB: this.teamMapper.fromJson(obj['team-b']),
      date: obj['date'] ? new Date(obj['date'].seconds * 1000) : undefined,
playground: obj['playground'],
      playerForm: obj['player-form']
        ? this.playerFormMapper.fromJson(obj['player-form'])
        : undefined,

      stadistics: obj.stadistics
        ? this.stadisticsMapper.fromJson(obj.stadistics)
        : undefined,
    };
  }

  toWeakJson(team: IMatchModel) {

    return {
      'team-a': this.teamMapper.toWeakJson(team.teamA),
      'team-b': this.teamMapper.toWeakJson(team.teamB),
      date: team.date,
      playground: team.playground || '',
      stadistics: team.stadistics
        ? this.stadisticsMapper.toJson(team.stadistics)
        : {},

      'player-form': team.playerForm
        ? this.playerFormMapper.toJson(team.playerForm)
        : {},
      score: team.score ? this.scoreMapper.toJson(team.score) : null,
    };
  }
}
