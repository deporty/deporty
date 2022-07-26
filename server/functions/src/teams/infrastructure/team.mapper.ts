import { ICreateTeamModel, ITeamModel } from '@deporty/entities/teams';
import { Firestore } from 'firebase-admin/firestore';
import { Observable, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Mapper } from '../../core/mapper';
import { PLAYER_ENTITY } from '../../players/infrastructure/player.constants';
import { MemberMapper } from './member.mapper';
import { TEAMS_ENTITY } from './team.constants';

export class TeamMapper extends Mapper<ITeamModel> {
  fromReferenceJson(obj: any): Observable<ITeamModel> {
    const g = !!obj['members']
      ? (obj['members'] as []).map((item) => {
          return this.memberMapper.fromReferenceJson(item);
        })
      : [];
    const x = zip(...g).pipe(
      catchError((err) => {

        return [];
      }),
      map((data) => {

        let z = {
          name: obj['name'],
          id: obj['id'],
          athem: obj['athem'],

          shield: obj['shield'],
          agent: obj['agent'],
        };
        return {
          ...z,
          members: data,
        };
      })
    );

    return x;
  }
  constructor(private memberMapper: MemberMapper, private db: Firestore) {
    super();
  }

  fromJsonWithOutId(obj: any): ICreateTeamModel {
    return {
      name: obj['name'],
      athem: obj['athem'] || '',
      members: !!obj['members']
        ? (obj['members'] as []).map((item) => {
            const obj = this.memberMapper.fromJson(item);
            return obj;
          })
        : [],
      shield: obj['shield'] || '',
      agent: obj['agent'] || '',
    };
  }

  fromJson(obj: any): ITeamModel {
    return {
      name: obj['name'],
      id: obj['id'],
      athem: obj['athem'],
      members: !!obj['members']
        ? (obj['members'] as []).map((item) => {
            return this.memberMapper.fromJson(item);
          })
        : [],

      shield: obj['shield'],
      agent: obj['agent'],
    };
  }

  toJson(team: ITeamModel) {
    const $members = !!team.members
      ? team.members.map((member) => {
          return {
            initDate: member.initDate,
            role: member.role,
            player: this.db
              .collection(PLAYER_ENTITY)
              .doc(member.player.id as string),
          };
        })
      : [];

    return {
      name: team.name,
      athem: team.athem || '',
      members: $members,

      shield: team.shield || '',
      agent: team.agent || '',
    };
  }

  toReferenceJson(team: ITeamModel) {
    return this.db.collection(TEAMS_ENTITY).doc(team.id);
  }
}
