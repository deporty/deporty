import { IMatchModel } from '@deporty/entities/tournaments';
import { TeamMapper } from '../../teams/infrastructure/team.mapper';
import { PlayerFormMapper } from './player-form.mapper';
import { ScoreMapper } from './score.mapper';
import { StadisticsMapper } from './stadistics.mapper';

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
      date: obj['date'] ,
      playground: obj['playground'],
      playerForm: obj['player-form']
        ? this.playerFormMapper.fromJson(obj['player-form'])
        : undefined,

      stadistics: !!obj.stadistics
        ? this.stadisticsMapper.fromJson(obj.stadistics)
        : undefined,
    };
  }

  toJson(match: IMatchModel) {
    return {
      'team-a': this.teamMapper.toReferenceJson( match.teamA),
      'team-b': this.teamMapper.toReferenceJson( match.teamB),
      date: match.date,
      playground: match.playground,
      stadistics: match.stadistics
        ? this.stadisticsMapper.toJson(match.stadistics)
        : {},

      'player-form': match.playerForm
        ? this.playerFormMapper.toJson(match.playerForm)
        : {},
      score: match.score ? this.scoreMapper.toJson(match.score) : null,
    };
  }
}
