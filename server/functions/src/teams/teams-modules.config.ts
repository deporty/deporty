import { Container } from "../core/DI";
import { PlayerRepository } from "./infrastructure/repository/team.repository";
import { TeamContract } from "./team.contract";
import { TeamMapper } from "./infrastructure/team.mapper";
import { CreatePlayerUsecase } from "./usecases/create-player/create-player.usecase";
import { DeletePlayerUsecase } from "./usecases/delete-player/delete-player.usecase";
import { GetPlayerByDocumentUsecase } from "./usecases/get-player-by-document/get-player-by-document.usecase";
import { GetTeamsUsecase } from "./usecases/get-teams/get-teams.usecase";
import { GetPlayerByEmailUsecase } from "./usecases/get-player-by-email/get-player-by-email.usecase";
export class PlayersModulesConfig {
  static config(container: Container) {
    container.add({
      id: "PlayerMapper",
      kind: TeamMapper,
      strategy: "singleton",
    });

    container.add({
      id: "TeamContract",
      kind: TeamContract,
      override: PlayerRepository,
      dependencies: ["DataSource", "PlayerMapper"],
      strategy: "singleton",
    });

    container.add({
      id: "GetTeamsUsecase",
      kind: GetTeamsUsecase,
      dependencies: ["TeamContract"],
      strategy: "singleton",
    });

    container.add({
      id: "DeletePlayerUsecase",
      kind: DeletePlayerUsecase,
      dependencies: ["TeamContract"],
      strategy: "singleton",
    });

    container.add({
      id: "GetPlayerByDocumentUsecase",
      kind: GetPlayerByDocumentUsecase,
      dependencies: ["TeamContract"],
      strategy: "singleton",
    });

    container.add({
      id: "GetPlayerByEmailUsecase",
      kind: GetPlayerByEmailUsecase,
      dependencies: ["TeamContract"],
      strategy: "singleton",
    });

    container.add({
      id: "CreatePlayerUsecase",
      kind: CreatePlayerUsecase,
      dependencies: ["TeamContract", "GetPlayerByDocumentUsecase", "GetPlayerByEmailUsecase"],
      strategy: "singleton",
    });

    // container.add({
    //   id: "DeletePlayerUsecase",
    //   kind: DeletePlayerUsecase,
    //   dependencies: ["PlayersDataSource"],
    //   strategy: "singleton",
    // });
  }
}
