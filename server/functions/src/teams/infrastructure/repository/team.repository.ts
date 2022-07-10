import { from, Observable, of, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ITeamModel, ICreateTeamModel } from '@deporty/entities/teams';
import { TeamContract } from '../../team.contract';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { TeamMapper } from '../team.mapper';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase-admin/firestore';
// import { PlayerRepository } from '../../../players/infrastructure/repository/player.repository';

export class TeamRepository extends TeamContract {
  static entity = 'teams';
  constructor(
    private dataSource: DataSource<any>,
    private teamMapper: TeamMapper // private playerRepository: PlayerRepository
  ) {
    super();
    this.dataSource.entity = TeamRepository.entity;
  }

  getByIdPopulate(id: string): Observable<ITeamModel | undefined> {
    return this.dataSource.getByIdPopulate(id, []).pipe(
      map((team) => {
        if (!!team) {
          const members = !!team.members
            ? team.members.map((member: DocumentReference) => {
                return from(member.get()).pipe(
                  map((snapshot: DocumentSnapshot<DocumentData>) => {
                    return {
                      ...snapshot.data(),
                      id: snapshot.id,
                    };
                  })
                );
              })
            : [];
          return !!members.length
            ? zip(...members).pipe(
                map((z) => {
                  return {
                    ...team,
                    members: z,
                  };
                })
              )
            : of(team);
        }
        return of(null);
      }),
      mergeMap((x) => x),
      map((team) => {
        return this.teamMapper.fromJson(team);
      })
    );
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

  update(id: string, entity: ITeamModel): Observable<void> {
    return this.dataSource.update(id, entity);
  }
}
