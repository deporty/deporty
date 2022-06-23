import { ICreatePlayerModel, IPlayerModel } from "@deporty/entities/players";
import { Observable } from "rxjs";
import { DataSourceFilter } from "../core/datasource";

export abstract class PlayerContract {
  abstract getPlayers(): Observable<IPlayerModel[]>;
  abstract getPlayerById(id: string): Observable<IPlayerModel | undefined>;
  abstract getByFilter(filters: DataSourceFilter[]): Observable<IPlayerModel[]>;
  abstract save(player: ICreatePlayerModel): Observable<string>;
  abstract delete(id: string): Observable<void>;
}
