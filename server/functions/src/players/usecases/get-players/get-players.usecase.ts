import { IPlayerModel } from "@deporty/entities/players";
import { Observable } from "rxjs";
import { Usecase } from "../../../core/usecase";
import { PlayerContract } from "../../player.contract";


export class GetPlayersUsecase extends Usecase<string, IPlayerModel[]> {
  constructor(public playerContract: PlayerContract) {
    super();
  }
  call(): Observable<IPlayerModel[]> {
    return this.playerContract.getPlayers();
  }
}
