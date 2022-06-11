import { IPlayerModel } from "@deporty/entities/players";
import { Observable, throwError } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { Usecase } from "../../../core/usecase";
import { PlayerContract } from "../../player.contract";
import { GetPlayerByDocumentUsecase } from "../get-player-by-document/get-player-by-document.usecase";
import { PlayerAlreadyExistsException } from "./create-player.exceptions";

export class CreatePlayerUsecase extends Usecase<IPlayerModel, string> {
  constructor(
    public playerContract: PlayerContract,
    private getPlayerByDocumentUsecase: GetPlayerByDocumentUsecase
  ) {
    super();
  }
  call(player: IPlayerModel): Observable<string> {
    return this.getPlayerByDocumentUsecase.call(player.document).pipe(
      map((playerPrev: IPlayerModel | undefined) => {
        if (playerPrev) {
          return throwError(
            new PlayerAlreadyExistsException(playerPrev.document)
          );
        } else {
          return this.playerContract.save(player)
        }
      }),
      mergeMap((x) => x)
    );
  }
}
