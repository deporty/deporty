import { IPlayerModel } from "@deporty/entities/players";
import { Observable } from "rxjs";
import { Usecase } from "../../../core/usecase";
import { TeamContract } from "../../team.contract";


export class GetTeamsUsecase extends Usecase<string, IPlayerModel[]> {
  constructor(public teamContract: TeamContract) {
    super();
  }
  call(): Observable<IPlayerModel[]> {
    return this.teamContract.get();
  }
}
