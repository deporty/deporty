import { IPlayerModel } from '@deporty/entities/players';
import { IMemberModel } from '@deporty/entities/teams';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getDateFromSeconds } from '../../core/helpers';
import { Mapper } from '../../core/mapper';
import { PlayerMapper } from '../../players/infrastructure/player.mapper';

export class MemberMapper extends Mapper<IMemberModel> {
  constructor(private playerMapper: PlayerMapper) {
    super();
  }

  fromReferenceJson(obj: any): Observable<IMemberModel> {
    return this.mapInsideReferences(obj).pipe(
      map((x) => {
        const response = {
          role: x['role'],
          player: this.playerMapper.fromJson(x['player']),
          retirementDate: x['retirement-date'],
          initDate: x['init-date'],
        };
        return response;
      })
    );
  }

  fromJson(obj: any): IMemberModel {
    return {
      role: obj['role'],

      initDate: obj['init-date'],
      retirementDate: !!obj['retirement-date']
        ? getDateFromSeconds(parseInt(obj['retirement-date']['_seconds']))
        : undefined,
      player:   this.playerMapper.fromJson(obj['player']),
    };
  }

  fromJsonWithOutId(obj: any): IMemberModel {
    throw new Error('Method not implemented.');
  }

  toJson(member: IMemberModel) {
    return {
      role: member.role || '',
    };
  }
  toReferenceJson(member: IMemberModel) {
    const obj = {
      'retirement-date': member.retirementDate,
      'init-date': member.initDate,
      role: member.role,
      player: this.playerMapper.toReferenceJson(member.player),
    };

    return obj;
  }

  toFullJson(player: IPlayerModel) {
    return {
      name: player.name,
      'last-name': player.lastName || '',
      document: player.document,
      alias: player.alias || '',
      number: player.number || '',
      role: player.role || '',
      email: player.email || '',
      phone: player.phone || '',
      image: player.image || '',
    };
  }
}
