import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  ITeamModel, ICreateTeamModel } from '@deporty/entities/teams';
import { TeamContract } from '../../team.contract';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { TeamMapper } from '../team.mapper';

export class TeamRepository extends TeamContract {
  static entity = 'teams';
  constructor(
    private dataSource: DataSource<any>,
    private teamMapper: TeamMapper
  ) {
    super();
    this.dataSource.entity = TeamRepository.entity;
  }
  get(): Observable<ITeamModel[]> {
    return this.dataSource.getByFilter([]).pipe(
      map((docs) => {
        return docs.map(this.teamMapper.fromJson);
      })
    );
  }

  getByFilter(filters: DataSourceFilter[]): Observable<ITeamModel[]> {
    return this.dataSource.getByFilter(filters).pipe(
      map((docs) => {
        return docs.map(this.teamMapper.fromJson);
      })
    );
  }

  save(team: ICreateTeamModel): Observable<string> {
    const mappedTeam = this.teamMapper.toJson(team);
    return this.dataSource.save(mappedTeam);
  }

  delete(id: string): Observable<void> {
    return this.dataSource.deleteById(id);
  }
}
