import { ICreatePlayerModel, IPlayerModel } from "@deporty/entities/players";
import { Observable } from "rxjs";
import { DataSourceFilter } from "../core/datasource";

export abstract class PlayerContract {
  abstract getPlayers(): Observable<IPlayerModel[]>;
  abstract getByFilter(filters: DataSourceFilter[]): Observable<IPlayerModel[]>;
  abstract save(player: ICreatePlayerModel): Observable<string>;
  
}
