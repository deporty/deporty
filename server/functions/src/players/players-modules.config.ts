import { Container } from "../core/DI";
import { PlayerContract } from "./player.contract";
import { PlayerMapper } from "./player.mapper";
import { PlayerRepository } from "./player.repository";
import { DeletePlayerUsecase } from "./usecases/delete-player/delete-player.usecase";
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

    // container.add({
    //   id: "DeletePlayerUsecase",
    //   kind: DeletePlayerUsecase,
    //   dependencies: ["PlayersDataSource"],
    //   strategy: "singleton",
    // });
  }
}
