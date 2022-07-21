import { IMemberModel } from '@deporty/entities/teams';
import { PlayerMapper } from '../../players/infrastructure/player.mapper';

export class MemberMapper {
  constructor(private playerMapper: PlayerMapper) {}

  fromJson(obj: any): IMemberModel {
    return {
      ...this.playerMapper.fromJson(obj),
      initDate: obj['init-date'],

      role: obj['role'],
    };
  }

  toJson(member: IMemberModel) {
    return {
      player: (member as any).player,
      'init-date': member.initDate,
      role: member.role,
    };
  }
}
