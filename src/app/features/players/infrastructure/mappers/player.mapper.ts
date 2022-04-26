import { Injectable } from '@angular/core';
import { IPlayerModel } from '../../models/player.model';
@Injectable()
export class PlayerMapper {
  fromJson(obj: any): IPlayerModel {
    return {
      name: obj['name'],
      lastName: obj['last-name'],
      id: obj['id'],
      alias: obj['alias'],
      number: obj['number'],
      role: obj['role'],
      image: obj['image'],
    };
  }
}
