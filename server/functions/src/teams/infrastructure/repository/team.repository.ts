import { ICreateTeamModel, ITeamModel } from '@deporty/entities/teams';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { TeamContract } from '../../team.contract';
import { TEAMS_ENTITY } from '../team.constants';
import { TeamMapper } from '../team.mapper';

export class TeamRepository extends TeamContract {
  static entity = TEAMS_ENTITY;
  constructor(
    private dataSource: DataSource<any>,
    private teamMapper: TeamMapper // private playerRepository: PlayerRepository,
  ) {
    super();
    this.dataSource.entity = TeamRepository.entity;
  }

  getByIdPopulate(id: string): Observable<ITeamModel | undefined> {
    this.dataSource.entity = TeamRepository.entity;
    return this.dataSource.getById(id).pipe(
      map((team) => {
        if (!!team) {
          return this.teamMapper.fromReferenceJson(team);
        }
        return of(undefined);
      }),
      mergeMap((x) => x)
    );
  }

  get(): Observable<ITeamModel[]> {
    this.dataSource.entity = TeamRepository.entity;

    return this.dataSource.getByFilter([]).pipe(
      map((docs) => {
        return docs.map((x) => this.teamMapper.fromJson(x));
      })
    );
  }

  getByFilter(filters: DataSourceFilter[]): Observable<ITeamModel[]> {
    this.dataSource.entity = TeamRepository.entity;

    return this.dataSource.getByFilter(filters).pipe(
      map((docs) => {
        return docs.map(this.teamMapper.fromJson);
      })
    );
  }

  save(team: ICreateTeamModel): Observable<string> {
    this.dataSource.entity = TeamRepository.entity;

    const mappedTeam = this.teamMapper.toJson(team as ITeamModel);
    return this.dataSource.save(mappedTeam);
  }

  delete(id: string): Observable<void> {
    this.dataSource.entity = TeamRepository.entity;

    return this.dataSource.deleteById(id);
  }

  update(id: string, entity: ITeamModel): Observable<ITeamModel> {
    this.dataSource.entity = TeamRepository.entity;

    return this.dataSource.update(id, this.teamMapper.toJson(entity));
  }
}
