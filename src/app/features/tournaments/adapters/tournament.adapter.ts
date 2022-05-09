import { Observable } from 'rxjs';
import { ITeamModel } from '../../teams/models/team.model';
import { IFixtureStageModel } from '../models/fixture-stage.model';
import { IGroupModel } from '../models/group.model';
import { IMatchModel } from '../models/match.model';
import { ITournamentModel } from '../models/tournament.model';

export abstract class TournamentAdapter {
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
    group: Omit<IGroupModel,'index'>
  ): Observable<void>;
}
