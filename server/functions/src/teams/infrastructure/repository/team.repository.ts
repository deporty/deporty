import { ICreateTeamModel, ITeamModel } from '@deporty/entities/teams';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
} from 'firebase-admin/firestore';
import { from, Observable, of, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { getDateFromSeconds } from '../../../core/helpers';
import { PlayerRepository } from '../../../players/infrastructure/repository/player.repository';
import { TeamContract } from '../../team.contract';
import { TeamMapper } from '../team.mapper';

export class TeamRepository extends TeamContract {
  static entity = 'teams';
  constructor(
    private dataSource: DataSource<any>,
    private teamMapper: TeamMapper, // private playerRepository: PlayerRepository,
    private db: Firestore
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
                    const seconds = parseInt(
                      memberData['init-date']['_seconds']
                    );
                    const date = getDateFromSeconds(seconds);
                    return {
                      ...snapshot.data(),
                      'init-date': date,
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

    const $members = !!entity.members
      ? entity.members.map((member) => {
          return {
            initDate: member.initDate,
            role: member.role,
            player: this.db
              .collection(PlayerRepository.entity)
              .doc(member.id as string),
          };
        })
      : [];

    entity.members = $members;

    return this.dataSource.update(id, this.teamMapper.toJson(entity));
  }
}
