import { IPlayerModel } from '@deporty/entities/players';
import { Observable } from 'rxjs';
import { ITeamModel } from '../models/team.model';



export abstract class TeamAdapter {
  abstract getTeams(): Observable<ITeamModel[]>;
  abstract createTeam(team: ITeamModel): Observable<string>;
  abstract deleteTeam(team: ITeamModel): Observable<void>;
  abstract updateTeam(team: ITeamModel): Observable<void>;
  abstract getPlayersByTeam(team: ITeamModel): Observable<IPlayerModel[]>;
  // abstract addPlayerToTeam(
  //   player: IPlayerModel,
  //   team: ITeamModel
  // ): Observable<void>;
}
