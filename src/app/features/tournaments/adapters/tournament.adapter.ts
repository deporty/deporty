import { Observable } from 'rxjs';
import { IFixtureStageModel } from '../models/fixture-stage.model';
import { IFixtureModel } from '../models/fixture.model';
import { IMatchModel } from '../models/match.model';
import { ITournamentModel } from '../models/tournament.model';

export abstract class TournamentAdapter {
  abstract getAllSummaryTournaments(): Observable<ITournamentModel[]>;
  abstract getTournamentSummaryById(id: string): Observable<ITournamentModel>;
  abstract getTournamentFixtureStagesById(id: string): Observable<IFixtureStageModel[]>;
  abstract getCurrentTournamentSummaryByLocation(location: string): Observable<ITournamentModel>;
}
