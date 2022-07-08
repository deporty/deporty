import { Container } from '../core/DI';
import { PlayersModulesConfig } from '../players/players-modules.config';
import { TeamsModulesConfig } from '../teams/teams-modules.config';
import { FixtureStageMapper } from './infrastructure/fixture-stage.mapper';
import { FixtureMapper } from './infrastructure/fixture.mapper';
import { GroupMapper } from './infrastructure/group.mapper';
import { MatchMapper } from './infrastructure/match.mapper';
import { PlayerFormMapper } from './infrastructure/player-form.mapper';
import { TournamentRepository } from './infrastructure/repository/tournament.repository';
import { ScoreMapper } from './infrastructure/score.mapper';
import { StadisticsMapper } from './infrastructure/stadistics.mapper';
import { TournamentMapper } from './infrastructure/tournament.mapper';
import { TournamentContract } from './tournament.contract';
import { GetStatisticsUsecase } from './usecases/get-statistics/get-statistics.usecase';
export class TournamentsModulesConfig {
  static config(container: Container) {
    PlayersModulesConfig.config(container);
    TeamsModulesConfig.config(container);

    // private scoreMapper: ScoreMapper,
    // private teamMapper: TeamMapper,
    // private stadisticsMapper: StadisticsMapper,
    // private playerFormMapper: PlayerFormMapper

    container.add({
      id: 'ScoreMapper',
      kind: ScoreMapper,
      strategy: 'singleton',
    });

    container.add({
      id: 'StadisticsMapper',
      kind: StadisticsMapper,
      strategy: 'singleton',
    });

    container.add({
      id: 'PlayerFormMapper',
      kind: PlayerFormMapper,
      strategy: 'singleton',
    });

    container.add({
      id: 'MatchMapper',
      kind: MatchMapper,
      dependencies: [
        'ScoreMapper',
        'TeamMapper',
        'StadisticsMapper',
        'PlayerFormMapper',
      ],
      strategy: 'singleton',
    });
    container.add({
      id: 'GroupMapper',
      kind: GroupMapper,
      dependencies: ['MatchMapper', 'TeamMapper'],
      strategy: 'singleton',
    });

    container.add({
      id: 'FixtureStageMapper',
      kind: FixtureStageMapper,
      dependencies: ['GroupMapper'],
      strategy: 'singleton',
    });

    container.add({
      id: 'FixtureMapper',
      kind: FixtureMapper,
      dependencies: ['FixtureStageMapper'],
      strategy: 'singleton',
    });

    container.add({
      id: 'TournamentMapper',
      kind: TournamentMapper,
      dependencies: ['TeamMapper', 'FixtureMapper'],
      strategy: 'singleton',
    });

    container.add({
      id: 'TournamentContract',
      kind: TournamentContract,
      override: TournamentRepository,
      dependencies: ['DataSource', 'TournamentMapper'],
      strategy: 'singleton',
    });

    container.add({
      id: 'GetStatisticsUsecase',
      kind: GetStatisticsUsecase,
      dependencies: ['GetPlayerByIdUsecase', 'TournamentContract'],
      strategy: 'singleton',
    });
  }
}
