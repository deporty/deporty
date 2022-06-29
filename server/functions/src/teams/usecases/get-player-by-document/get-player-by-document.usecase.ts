import { IPlayerModel } from "@deporty/entities/players";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Usecase } from "../../../core/usecase";
import { TeamContract } from "../../team.contract";

export class GetPlayerByDocumentUsecase extends Usecase<
  string,
  IPlayerModel | undefined
> {
  constructor(private playerContract: TeamContract) {
    super();
  }
  call(document: string): Observable<IPlayerModel | undefined> {
    console.log(this.playerContract);
    return this.playerContract
      .getByFilter([
        {
          property: "document",
          equals: document,
        },
      ])
      .pipe(
        map((players: IPlayerModel[]) => {
          return players.length > 0 ? players[0] : undefined;
        })
      );
  }
}
