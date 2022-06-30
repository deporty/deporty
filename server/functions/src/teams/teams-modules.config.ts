import { Container } from '../core/DI';
import { TeamRepository } from './infrastructure/repository/team.repository';
import { TeamContract } from './team.contract';
import { TeamMapper } from './infrastructure/team.mapper';
import { CreateTeamUsecase } from './usecases/create-team/create-team.usecase';
import { DeleteTeamUsecase } from './usecases/delete-team/delete-team.usecase';
import { GetTeamByIdUsecase } from './usecases/get-team-by-id/get-team-by-id.usecase';
import { GetTeamsUsecase } from './usecases/get-teams/get-teams.usecase';
import { PlayerMapper } from '../players/infrastructure/player.mapper';
import { GetTeamByNameUsecase } from './usecases/get-team-by-name/get-team-by-name.usecase';
export class TeamsModulesConfig {
  static config(container: Container) {
    container.add({
      id: 'PlayerMapper',
      kind: PlayerMapper,
      strategy: 'singleton',
    });

    container.add({
      id: 'TeamMapper',
      kind: TeamMapper,
      strategy: 'singleton',
      dependencies: ['PlayerMapper'],
    });

    container.add({
      id: 'TeamContract',
      kind: TeamContract,
      override: TeamRepository,
      dependencies: ['DataSource', 'TeamMapper'],
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
  }
}
