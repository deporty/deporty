import { map } from "rxjs/operators";
import { DataSource } from "../core/datasource";
import { PlayerContract } from "./player.contract";
import { PlayerMapper } from "./player.mapper";

export class PlayerRepository extends PlayerContract {
  static entity = "players";
  constructor(
    private dataSource: DataSource<any>,
    private playerMapper: PlayerMapper
  ) {
    super();
    this.dataSource.entity = PlayerRepository.entity;
  }
  getPlayers() {
    return this.dataSource.getByFilter([]).pipe(
      map((docs) => {
        return docs.map(this.playerMapper.fromJson);
      })
    );
  }
}
