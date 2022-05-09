import { Observable } from 'rxjs';
import { ITeamModel } from '../models/team.model';

export abstract class TeamAdapter {
  abstract getTeams(): Observable<ITeamModel[]>;
  abstract createTeam(team: ITeamModel): Observable<string>;
  abstract deleteTeam(team: ITeamModel): Observable<void>;
  abstract updateTeam(team: ITeamModel): Observable<void>;
}
