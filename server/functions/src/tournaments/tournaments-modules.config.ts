import { Container } from '../core/DI';
import { PlayersModulesConfig } from '../players/players-modules.config';
import { TeamsModulesConfig } from '../teams/teams-modules.config';
import { FixtureStageMapper } from './infrastructure/fixture-stage.mapper';
import { FixtureMapper } from './infrastructure/fixture.mapper';
import { GroupMapper } from './infrastructure/group.mapper';
import { MatchMapper } from './infrastructure/match.mapper';
import { PlayerFormMapper } from './infrastructure/player-form.mapper';
import { RegisteredTeamMapper } from './infrastructure/registered-teams.mapper';
import { TournamentRepository } from './infrastructure/repository/tournament.repository';
import { ScoreMapper } from './infrastructure/score.mapper';
import { StadisticsMapper } from './infrastructure/stadistics.mapper';
import { TournamentMapper } from './infrastructure/tournament.mapper';
import { TournamentContract } from './tournament.contract';
import { AddTeamToTournamentUsecase } from './usecases/add-team-to-tournament/add-team-to-tournament.usecase';
import { CreateFixtureByGroupUsecase } from './usecases/create-fixture-by-group/create-fixture-by-group.usecase';
import { GetMarkersTableUsecase } from './usecases/get-markers-table/get-markers-table.usecase';
import { GetPosibleTeamsToAddUsecase } from './usecases/get-posible-teams-to-add/get-posible-teams-to-add.usecase';
import { GetTournamentByIdUsecase } from './usecases/get-tournament-by-id/get-tournament-by-id.usecase';
import { UpdateTournamentUsecase } from './usecases/update-tournament/update-tournament.usecase';
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
      id: 'RegisteredTeamMapper',
      kind: RegisteredTeamMapper,
      dependencies: ['TeamMapper', 'PlayerMapper'],
      strategy: 'singleton',
    });

    container.add({
      id: 'TournamentMapper',
      kind: TournamentMapper,
      dependencies: ['RegisteredTeamMapper', 'FixtureMapper'],
      strategy: 'singleton',
    });

    container.add({
      id: 'TournamentContract',
      kind: TournamentContract,
      override: TournamentRepository,
      dependencies: ['DataSource', 'TournamentMapper', 'FixtureStageMapper', 'FirebaseDatabase'],
      strategy: 'singleton',
    });

    container.add({
      id: 'GetMarkersTableUsecase',
      kind: GetMarkersTableUsecase,
      dependencies: ['GetPlayerByIdUsecase', 'TournamentContract'],
      strategy: 'singleton',
    });
    container.add({
      id: 'GetTournamentByIdUsecase',
      kind: GetTournamentByIdUsecase,
      dependencies: ['TournamentContract'],
      strategy: 'singleton',
    });

    container.add({
      id: 'UpdateTournamentUsecase',
      kind: UpdateTournamentUsecase,
      dependencies: ['TournamentContract'],
      strategy: 'singleton',
    });
    container.add({
      id: 'CreateFixtureByGroupUsecase',
      kind: CreateFixtureByGroupUsecase,
      dependencies: ['GetTournamentByIdUsecase', 'UpdateTournamentUsecase'],
      strategy: 'singleton',
    });
    container.add({
      id: 'AddTeamToTournamentUsecase',
      kind: AddTeamToTournamentUsecase,
      dependencies: ['GetTournamentByIdUsecase', 'GetTeamByIdUsecase', 'UpdateTournamentUsecase'],
      strategy: 'singleton',
    });
    container.add({
      id: 'GetPosibleTeamsToAddUsecase',
      kind: GetPosibleTeamsToAddUsecase,
      dependencies: ['GetTeamsUsecase', 'GetTournamentByIdUsecase'],
      strategy: 'singleton',
    });


  }
}
