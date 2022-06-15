import { Container } from "../core/DI";
import { PlayerRepository } from "./infrastructure/repository/player.repository";
import { PlayerContract } from "./player.contract";
import { PlayerMapper } from "./infrastructure/player.mapper";
import { CreatePlayerUsecase } from "./usecases/create-player/create-player.usecase";
import { DeletePlayerUsecase } from "./usecases/delete-player/delete-player.usecase";
import { GetPlayerByDocumentUsecase } from "./usecases/get-player-by-document/get-player-by-document.usecase";
import { GetPlayersUsecase } from "./usecases/get-players/get-players.usecase";
export class PlayersModulesConfig {
  static config(container: Container) {
    container.add({
      id: "PlayerMapper",
      kind: PlayerMapper,
      strategy: "singleton",
    });

    container.add({
      id: "PlayerContract",
      kind: PlayerContract,
      override: PlayerRepository,
      dependencies: ["DataSource", "PlayerMapper"],
      strategy: "singleton",
    });

    container.add({
      id: "GetPlayersUsecase",
      kind: GetPlayersUsecase,
      dependencies: ["PlayerContract"],
      strategy: "singleton",
    });

    container.add({
      id: "DeletePlayerUsecase",
      kind: DeletePlayerUsecase,
      dependencies: ["PlayerContract"],
      strategy: "singleton",
    });

    container.add({
      id: "GetPlayerByDocumentUsecase",
      kind: GetPlayerByDocumentUsecase,
      dependencies: ["PlayerContract"],
      strategy: "singleton",
    });

    container.add({
      id: "CreatePlayerUsecase",
      kind: CreatePlayerUsecase,
      dependencies: ["PlayerContract", "GetPlayerByDocumentUsecase"],
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
