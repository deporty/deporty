import { IPlayerModel } from "@deporty/entities/players";
import { Observable } from "rxjs";

export abstract class PlayerContract {
  abstract getPlayers(): Observable<IPlayerModel[]>;
}
