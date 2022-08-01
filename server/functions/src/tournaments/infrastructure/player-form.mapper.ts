import { IPlayerFormModel } from '@deporty/entities/tournaments';
import { PlayerMapper } from '../../players/infrastructure/player.mapper';

export class PlayerFormMapper {
  constructor(
    private playerMapper: PlayerMapper) {}
  fromJson(obj: any): IPlayerFormModel {
    const response: IPlayerFormModel = {
      teamA: !!obj['team-a'] ? (obj['team-a'] as []).map(x=> this.playerMapper.fromJson(x)): [],
      teamB: !!obj['team-b'] ? (obj['team-b'] as []).map(x=> this.playerMapper.fromJson(x)): [],
    };

    return response;
  }

  toJson(playerForm: IPlayerFormModel) {
    let response: any = {
      'team-a': (playerForm.teamA || []).map((x) =>
        this.playerMapper.toReferenceJson(x)
      ),
      'team-b': (playerForm.teamB || []).map((x) =>
        this.playerMapper.toReferenceJson(x)
      ),
    };

    return response;
  }
}
