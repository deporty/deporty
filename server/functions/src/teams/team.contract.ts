import { ITeamModel } from '@deporty/entities/teams';
import { Observable } from 'rxjs';
import { DataSourceFilter } from '../core/datasource';

export abstract class TeamContract {
  abstract get(): Observable<ITeamModel[]>;
  abstract getByFilter(filters: DataSourceFilter[]): Observable<ITeamModel[]>;
  abstract save(team: ITeamModel): Observable<string>;
  abstract delete(id: string): Observable<void>;
}
