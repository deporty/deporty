import { ITeamModel } from "@deporty/entities/teams";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Usecase } from "../../../core/usecase";
import { TeamContract } from "../../team.contract";

export class GetTeamByIdUsecase extends Usecase<
  string,
  ITeamModel | undefined
> {
  constructor(private teamContract: TeamContract) {
    super();
  }
  call(document: string): Observable<ITeamModel | undefined> {
    console.log(this.teamContract);
    return this.teamContract
      .getByFilter([
        {
          property: "document",
          equals: document,
        },
      ])
      .pipe(
        map((teams: ITeamModel[]) => {
          return teams.length > 0 ? teams[0] : undefined;
        })
      );
  }
}
