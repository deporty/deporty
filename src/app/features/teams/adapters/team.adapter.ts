import { Observable } from "rxjs";
import { ITeamModel } from "../models/team.model";

export abstract class TeamAdapter{
    abstract getTeams(): Observable<ITeamModel[]>
}