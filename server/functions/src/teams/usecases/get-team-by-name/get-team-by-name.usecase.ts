import { ITeamModel } from "@deporty/entities/teams";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Usecase } from "../../../core/usecase";
import { TeamContract } from "../../team.contract";

export class GetTeamByNameUsecase extends Usecase<
  string,
  ITeamModel | undefined
> {
  constructor(private teamContract: TeamContract) {
    super();
  }
  call(name: string): Observable<ITeamModel | undefined> {
    return this.teamContract
      .getByFilter([
        {
          property: "name",
          equals: name,
        },
      ])
      .pipe(
        map((teams: ITeamModel[]) => {
          return teams.length > 0 ? teams[0] : undefined;
        })
      );
  }
}
