import { ITeamModel } from "@deporty/entities/teams";
import { Observable } from "rxjs";
import { Usecase } from "../../../core/usecase";
import { TeamContract } from "../../team.contract";


export class GetTeamsUsecase extends Usecase<string, ITeamModel[]> {
  constructor(public teamContract: TeamContract) {
    super();
  }
  call(): Observable<ITeamModel[]> {
    return this.teamContract.get();
  }
}
