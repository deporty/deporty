import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICreatePlayerModel, IPlayerModel } from '@deporty/entities/players';
import { PlayerContract } from '../../player.contract';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { PlayerMapper } from '../player.mapper';

export class PlayerRepository extends PlayerContract {
  static entity = 'players';
  constructor(
    private dataSource: DataSource<any>,
    private playerMapper: PlayerMapper
  ) {
    super();
    this.dataSource.entity = PlayerRepository.entity;
  }
  getPlayers(): Observable<IPlayerModel[]> {
    return this.dataSource.getByFilter([]).pipe(
      map((docs) => {
        return docs.map(this.playerMapper.fromJson);
      })
    );
  }

  getByFilter(filters: DataSourceFilter[]): Observable<IPlayerModel[]> {
    return this.dataSource.getByFilter(filters).pipe(
      map((docs) => {
        return docs.map(this.playerMapper.fromJson);
      })
    );
  }

  save(player: ICreatePlayerModel): Observable<string> {
    const mappedPlayer = this.playerMapper.toJson(player);
    return this.dataSource.save(mappedPlayer);
  }

  delete(id: string): Observable<void> {
    return this.dataSource.deleteById(id);
  }
}
