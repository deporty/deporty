import { Container } from '../core/DI';
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
import { AddMatchToGroupInsideTournamentUsecase } from './usecases/add-match-to-group-inside-tournament/add-match-to-group-inside-tournament.usecase';
import { AddTeamToGroupInsideTournamentUsecase } from './usecases/add-team-to-group-inside-tournament/add-team-to-group-inside-tournament.usecase';
import { AddTeamToTournamentUsecase } from './usecases/add-team-to-tournament/add-team-to-tournament.usecase';
import { AddTeamsToGroupInsideTournamentUsecase } from './usecases/add-teams-to-group-inside-tournament/add-teams-to-group-inside-tournament.usecase';
import { CreateFixtureByGroupUsecase } from './usecases/create-fixture-by-group/create-fixture-by-group.usecase';
import { EditMatchToGroupInsideTournamentUsecase } from './usecases/edit-match-to-group-inside-tournament/edit-match-to-group-inside-tournament.usecase';
import { GetMarkersTableUsecase } from './usecases/get-markers-table/get-markers-table.usecase';
import { GetPosibleTeamsToAddUsecase } from './usecases/get-posible-teams-to-add/get-posible-teams-to-add.usecase';
import { GetTournamentByIdUsecase } from './usecases/get-tournament-by-id/get-tournament-by-id.usecase';
import { GetTournamentsUsecase } from './usecases/get-tournaments/get-tournaments.usecase';
import { UpdateTournamentUsecase } from './usecases/update-tournament/update-tournament.usecase';
export class TournamentsModulesConfig {
  static config(container: Container) {
    container.add({
      id: 'ScoreMapper',
      kind: ScoreMapper,
      strategy: 'singleton',
    });

    container.add({
      id: 'StadisticsMapper',
      kind: StadisticsMapper,
      dependencies: ['PlayerMapper'],
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
      dependencies: ['TeamMapper', 'MemberMapper'],
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
      dependencies: ['DataSource', 'TournamentMapper', 'FirebaseDatabase'],
      strategy: 'singleton',
    });

    container.add({
      id: 'GetMarkersTableUsecase',
      kind: GetMarkersTableUsecase,
      dependencies: [ 'TournamentContract'],
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
      dependencies: [
        'GetTournamentByIdUsecase',
        'GetTeamByIdUsecase',
        'UpdateTournamentUsecase',
      ],
      strategy: 'singleton',
    });

    container.add({
      id: 'GetPosibleTeamsToAddUsecase',
      kind: GetPosibleTeamsToAddUsecase,
      dependencies: ['GetTeamsUsecase', 'GetTournamentByIdUsecase'],
      strategy: 'singleton',
    });
    container.add({
      id: 'GetTournamentsUsecase',
      kind: GetTournamentsUsecase,
      dependencies: ['TournamentContract'],
      strategy: 'singleton',
    });

    container.add({
      id: 'AddMatchToGroupInsideTournamentUsecase',
      kind: AddMatchToGroupInsideTournamentUsecase,
      dependencies: [
        'GetTournamentByIdUsecase',
        'UpdateTournamentUsecase',
        'GetTeamByIdUsecase',
      ],
      strategy: 'singleton',
    });
    container.add({
      id: 'AddTeamToGroupInsideTournamentUsecase',
      kind: AddTeamToGroupInsideTournamentUsecase,
      dependencies: [
        'GetTournamentByIdUsecase',
        'GetTeamByIdUsecase',
        'UpdateTournamentUsecase',
      ],
      strategy: 'singleton',
    });
    container.add({
      id: 'AddTeamsToGroupInsideTournamentUsecase',
      kind: AddTeamsToGroupInsideTournamentUsecase,
      dependencies: [
        'GetTournamentByIdUsecase',
        'GetTeamByIdUsecase',
        'UpdateTournamentUsecase',
        'AddTeamToGroupInsideTournamentUsecase',
      ],
      strategy: 'singleton',
    });
    container.add({
      id: 'EditMatchToGroupInsideTournamentUsecase',
      kind: EditMatchToGroupInsideTournamentUsecase,
      dependencies: ['GetTournamentByIdUsecase', 'UpdateTournamentUsecase'],
      strategy: 'singleton',
    });
  }
}
