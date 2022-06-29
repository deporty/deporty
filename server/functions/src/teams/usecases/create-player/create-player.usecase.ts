import { IPlayerModel } from "@deporty/entities/players";
import { Observable, throwError } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { Usecase } from "../../../core/usecase";
import { TeamContract } from "../../team.contract";
import { GetPlayerByDocumentUsecase } from "../get-player-by-document/get-player-by-document.usecase";
import { GetPlayerByEmailUsecase } from "../get-player-by-email/get-player-by-email.usecase";
import { PlayerAlreadyExistsException } from "./create-player.exceptions";

export class CreatePlayerUsecase extends Usecase<IPlayerModel, string> {
  constructor(
    public playerContract: TeamContract,
    private getPlayerByDocumentUsecase: GetPlayerByDocumentUsecase,
    private getPlayerByEmailUsecase: GetPlayerByEmailUsecase
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
          if (player.email != undefined) {
            return this.getPlayerByEmailUsecase.call(player.email).pipe(
              map((playerEmailPrev: IPlayerModel | undefined) => {
                if (playerEmailPrev) {
                  return throwError(
                    new PlayerAlreadyExistsException(player.email)
                  );
                } else {
                  return this.playerContract.save(player);
                }
              }),
              mergeMap((x) => x)
            );
          }

          return this.playerContract.save(player);
        }
      }),
      mergeMap((x) => x)
    );
  }
}
