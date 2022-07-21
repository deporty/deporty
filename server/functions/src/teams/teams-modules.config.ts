import { Container } from '../core/DI';
import { MemberMapper } from './infrastructure/member.mapper';
// import { MemberMapper } from './infrastructure/member.mapper';
import { TeamRepository } from './infrastructure/repository/team.repository';
import { TeamMapper } from './infrastructure/team.mapper';
import { TeamContract } from './team.contract';
import { AsignPlayerToTeamUsecase } from './usecases/asign-player-to-team/asign-player-to-team.usecase';
import { CreateTeamUsecase } from './usecases/create-team/create-team.usecase';
import { DeleteTeamUsecase } from './usecases/delete-team/delete-team.usecase';
import { GetActiveTournamentsByRegisteredTeamUsecase } from './usecases/get-active-tournaments-by-registered-team/get-active-tournaments-by-registered-team.usecase';
import { GetTeamByIdUsecase } from './usecases/get-team-by-id/get-team-by-id.usecase';
import { GetTeamByNameUsecase } from './usecases/get-team-by-name/get-team-by-name.usecase';
import { GetTeamsUsecase } from './usecases/get-teams/get-teams.usecase';
export class TeamsModulesConfig {
  static config(container: Container) {
    container.add({
      id: 'MemberMapper',
      kind: MemberMapper,
      strategy: 'singleton',
      dependencies: ['PlayerMapper'],
    });

    container.add({
      id: 'TeamMapper',
      kind: TeamMapper,
      strategy: 'singleton',
      dependencies: ['MemberMapper'],
    });

    container.add({
      id: 'TeamContract',
      kind: TeamContract,
      override: TeamRepository,
      dependencies: ['DataSource', 'TeamMapper', 'FirebaseDatabase'],
      strategy: 'singleton',
    });

    container.add({
      id: 'GetTeamByNameUsecase',
      kind: GetTeamByNameUsecase,
      dependencies: ['TeamContract'],
      strategy: 'singleton',
    });

    container.add({
      id: 'GetTeamsUsecase',
      kind: GetTeamsUsecase,
      dependencies: ['TeamContract'],
      strategy: 'singleton',
    });

    container.add({
      id: 'DeleteTeamUsecase',
      kind: DeleteTeamUsecase,
      dependencies: ['TeamContract'],
      strategy: 'singleton',
    });

    container.add({
      id: 'GetTeamByIdUsecase',
      kind: GetTeamByIdUsecase,
      dependencies: ['TeamContract'],
      strategy: 'singleton',
    });

    container.add({
      id: 'CreateTeamUsecase',
      kind: CreateTeamUsecase,
      dependencies: ['TeamContract', 'GetTeamByNameUsecase'],
      strategy: 'singleton',
    });

    container.add({
      id: 'AsignPlayerToTeamUsecase',
      kind: AsignPlayerToTeamUsecase,
      dependencies: [
        'TeamContract',
        'GetTeamByIdUsecase',
        'GetPlayerByIdUsecase',
        'UpdateTournamentUsecase',
        'GetActiveTournamentsByRegisteredTeamUsecase',
      ],
      strategy: 'singleton',
    });

    container.add({
      id: 'GetActiveTournamentsByRegisteredTeamUsecase',
      kind: GetActiveTournamentsByRegisteredTeamUsecase,
      dependencies: ['TeamContract', 'TournamentContract'],
      strategy: 'singleton',
    });
  }
}
