import { IBaseResponse } from '@deporty/entities/general';
import { IPlayerModel } from '@deporty/entities/players';
import { IMemberModel } from '@deporty/entities/teams';
import { Observable } from 'rxjs';
import { ITeamModel } from '../models/team.model';



export abstract class TeamAdapter {
  abstract getTeams(): Observable<IBaseResponse<ITeamModel[]>>;
  abstract createTeam(team: ITeamModel): Observable<string>;
  abstract deleteTeam(team: ITeamModel): Observable<void>;
  abstract getTeamById(teamId: string): Observable<IBaseResponse<ITeamModel>>;
  abstract updateTeam(team: ITeamModel): Observable<void>;
  abstract getPlayersByTeam(team: ITeamModel): Observable<IPlayerModel[]>;
  abstract asignPlayerToTeam(teamId: String, playerId: String): Observable<IBaseResponse<IMemberModel>>;

}
