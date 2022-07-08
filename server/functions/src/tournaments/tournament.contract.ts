import { ITeamModel } from '@deporty/entities/teams';
import {
  IFixtureStageModel,
  IGroupModel,
  IMatchModel,
  ITournamentModel,
} from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { DataSourceFilter } from '../core/datasource';

export abstract class TournamentContract {

  abstract get(): Observable<ITournamentModel[]>;
  abstract getById(id: string): Observable<ITournamentModel | undefined>;
  abstract getByIdPopulate(id: string): Observable<ITournamentModel | undefined>;
  abstract getByFilter(filters: DataSourceFilter[]): Observable<ITournamentModel[]>;
  abstract save(team: any): Observable<string>;
  abstract delete(id: string): Observable<void>;


  
  abstract getAllSummaryTournaments(): Observable<ITournamentModel[]>;
  abstract getTournamentSummaryById(id: string): Observable<ITournamentModel>;
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

  abstract editMatchOfGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    match: IMatchModel
  ): Observable<void>;
}
