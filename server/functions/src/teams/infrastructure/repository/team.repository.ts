import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICreatePlayerModel, IPlayerModel } from '@deporty/entities/players';
import { TeamContract } from '../../team.contract';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { TeamMapper } from '../team.mapper';

export class PlayerRepository extends TeamContract {
  static entity = 'teams';
  constructor(
    private dataSource: DataSource<any>,
    private teamMapper: TeamMapper
  ) {
    super();
    this.dataSource.entity = PlayerRepository.entity;
  }
  get(): Observable<IPlayerModel[]> {
    return this.dataSource.getByFilter([]).pipe(
      map((docs) => {
        return docs.map(this.teamMapper.fromJson);
      })
    );
  }

  getByFilter(filters: DataSourceFilter[]): Observable<IPlayerModel[]> {
    return this.dataSource.getByFilter(filters).pipe(
      map((docs) => {
        return docs.map(this.teamMapper.fromJson);
      })
    );
  }

  save(player: ICreatePlayerModel): Observable<string> {
    const mappedPlayer = this.teamMapper.toJson(player);
    return this.dataSource.save(mappedPlayer);
  }

  delete(id: string): Observable<void> {
    return this.dataSource.deleteById(id);
  }
}
