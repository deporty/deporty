import { Injectable } from '@angular/core';
import { IPlayerModel } from '../../domain/models/player.model';
@Injectable()
export class PlayerMapper {
  fromJson(obj: any): IPlayerModel {
    return { name: obj['name'], lastName: obj['last-name'] };
  }
}
