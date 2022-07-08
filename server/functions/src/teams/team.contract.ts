import { ITeamModel, ICreateTeamModel } from '@deporty/entities/teams';
import { Observable } from 'rxjs';
import { DataSourceFilter } from '../core/datasource';

export abstract class TeamContract {
  abstract get(): Observable<ITeamModel[]>;
  abstract getByFilter(filters: DataSourceFilter[]): Observable<ITeamModel[]>;
  abstract getByIdPopulate(
    id: string
  ): Observable<ITeamModel | undefined>;

  abstract save(team: ICreateTeamModel): Observable<string>;
  abstract delete(id: string): Observable<void>;
}
