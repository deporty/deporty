import { Injectable } from '@angular/core';
import { IPlayerFormModel } from '../../models/player-form.model';

@Injectable()
export class PlayerFormMapper {
  fromJson(obj: any): IPlayerFormModel {
    const response: IPlayerFormModel = {
      teamA: obj['team-a'],
      teamB: obj['team-b'],
    };

    return response;
  }

  toJson(playerForm: IPlayerFormModel) {
    let response: any = {
      'team-a': playerForm.teamA || [],
      'team-b': playerForm.teamB || [],
    };

    return response;
  }
}
