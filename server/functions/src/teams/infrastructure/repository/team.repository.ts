import { ICreateTeamModel, ITeamModel } from '@deporty/entities/teams';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase-admin/firestore';
import { from, Observable, of, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { TeamContract } from '../../team.contract';
import { TeamMapper } from '../team.mapper';
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
    this.dataSource.entity = TeamRepository.entity;

    return this.dataSource.getByIdPopulate(id, []).pipe(
      map((team) => {
        if (!!team) {
          const members = !!team.members
            ? team.members.map((memberData: any) => {
                const member: DocumentReference = memberData['player'];
                return from(member.get()).pipe(
                  map((snapshot: DocumentSnapshot<DocumentData>) => {
                    const date = new Date(parseInt(memberData['init-date']['_seconds']));
                    return {
                      ...snapshot.data(),
                      initDate: date,
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
