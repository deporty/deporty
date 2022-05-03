import { Observable } from 'rxjs';
import { IFixtureStageModel } from '../models/fixture-stage.model';
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
}
