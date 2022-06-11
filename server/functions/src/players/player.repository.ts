import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DataSource, DataSourceFilter } from "../core/datasource";
import { PlayerContract } from "./player.contract";
import { PlayerMapper } from "./player.mapper";
import { IPlayerModel } from "@deporty/entities/players";

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

  getByFilter(filters: DataSourceFilter[]): Observable<IPlayerModel[]> {
    return this.dataSource.getByFilter(filters).pipe(
      map((docs) => {
        return docs.map(this.playerMapper.fromJson);
      })
    );
  }

  save(player: IPlayerModel): Observable<string> {
    return this.dataSource.save(player);
  }
}
