import { IBaseResponse } from '@deporty/entities/general';
import { IRegisteredTeamsModel, ITournamentModel } from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { ITeamModel } from '../../teams/models/team.model';
import { IFixtureStageModel } from '../models/fixture-stage.model';
import { IGroupModel } from '../models/group.model';
import { IMatchModel } from '../models/match.model';


export abstract class TournamentAdapter {
  abstract getMarkersTableByTornament(id: string): Observable<IBaseResponse<any[]>>;

  abstract getAllSummaryTournaments(): Observable<ITournamentModel[]>;
  abstract getTournamentSummaryById(id: string): Observable<IBaseResponse<ITournamentModel>>;
  abstract getAvailableTeamsToAdd(id: string): Observable<IBaseResponse<ITeamModel[]>>;
  abstract getTournamentFixtureStagesById(
    id: string
  ): Observable<IFixtureStageModel[]>;
  abstract getGroupsMatchesByTournamentId(
    tournamentId: string,
    stageIndex: number,
    groupIndex: number
  ): Observable<IMatchModel[]>;
  abstract getCurrentTournamentSummaryByLocation(
    location: string
  ): Observable<ITournamentModel>;

  abstract addTeamToGroupTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    teams: ITeamModel[]
  ): Observable<void>;

  abstract createGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    group: Omit<IGroupModel, 'index'>
  ): Observable<void>;

  abstract addMatchToGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    match: IMatchModel
  ): Observable<void>;


  abstract addTeamToTournament(
    tournamentId: string,
    teamId: string,
  ): Observable<IBaseResponse<IRegisteredTeamsModel>>;

  abstract editMatchOfGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    match: IMatchModel
  ): Observable<void>;
}
