import { IPlayerModel } from "@deporty/entities/players";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Usecase } from "../../../core/usecase";
import { PlayerContract } from "../../player.contract";

export class GetPlayerByEmailUsecase extends Usecase<string, IPlayerModel | undefined> {
  constructor(private playerContract: PlayerContract) {
    super();
  }
  call(email: string): Observable<IPlayerModel | undefined> {
    return this.playerContract
      .getByFilter([
        {
          property: "email",
          equals: email,
        },
      ])
      .pipe(
        map((players: IPlayerModel[]) => {
          return players.length > 0 ? players[0] : undefined;
        })
      );
  }
}