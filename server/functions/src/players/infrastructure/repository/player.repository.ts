import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICreatePlayerModel, IPlayerModel } from '@deporty/entities/players';
import { PlayerContract } from '../../player.contract';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { PlayerMapper } from '../player.mapper';
import { FileAdapter } from '../../../core/file/file.adapter';

export class PlayerRepository extends PlayerContract {
  static entity = 'players';
  constructor(
    private dataSource: DataSource<any>,
    private playerMapper: PlayerMapper,
    private fileAdapter: FileAdapter
  ) {
    super();
    this.dataSource.entity = PlayerRepository.entity;
  }
  getPlayers(): Observable<IPlayerModel[]> {
    this.dataSource.entity = PlayerRepository.entity;

    return this.dataSource.getByFilter([]).pipe(
      map((docs) => {
        return docs.map(this.playerMapper.fromJson);
      })
    );
  }

  getByFilter(filters: DataSourceFilter[]): Observable<IPlayerModel[]> {
    this.dataSource.entity = PlayerRepository.entity;

    return this.dataSource.getByFilter(filters).pipe(
      map((docs) => {
        return docs.map(this.playerMapper.fromJson);
      })
    );
  }

  save(player: ICreatePlayerModel): Observable<string> {
    this.dataSource.entity = PlayerRepository.entity;

    const mappedPlayer = this.playerMapper.toJson(player);
    return this.dataSource.save(mappedPlayer);
  }

  delete(id: string): Observable<void> {
    this.dataSource.entity = PlayerRepository.entity;

    return this.dataSource.deleteById(id).pipe(
      tap(() => {
        this.fileAdapter.deleteFile('');
      })
    );
  }

  getPlayerById(id: string): Observable<IPlayerModel | undefined> {
    this.dataSource.entity = PlayerRepository.entity;

    this.dataSource.entity = PlayerRepository.entity;

    return this.dataSource.getById(id).pipe(
      map((player) => {
        return player ? this.playerMapper.fromJson(player) : undefined;
      })
    );
  }
}
