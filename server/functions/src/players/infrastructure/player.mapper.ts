import { ICreatePlayerModel, IPlayerModel } from '@deporty/entities/players';
import { Firestore } from 'firebase-admin/firestore';
import { Mapper } from '../../core/mapper';
import { PLAYER_ENTITY } from './player.constants';

export class PlayerMapper extends Mapper<IPlayerModel> {
  fromReferenceJson(obj: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private db: Firestore) {
    super();
  }
  fromJson(obj: any): IPlayerModel {
    return {
      name: obj['name'],
      lastName: obj['last-name'],
      id: obj['id'],
      document: obj['document'],
      alias: obj['alias'],
      number: obj['number'],
      role: obj['role'],
      image: obj['image'],
      phone: obj['phone'],
      email: obj['email'],
    };
  }

  fromJsonWithOutId(obj: any): ICreatePlayerModel {
    return {
      name: obj['name'],
      lastName: obj['last-name'],
      document: obj['document'],
      alias: obj['alias'],
      number: obj['number'],
      role: obj['role'],
      image: obj['image'],
      email: obj['email'],
      phone: obj['phone'],
    };
  }

  toJson(player: ICreatePlayerModel) {
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

  toReferenceJson(player: IPlayerModel) {
    return this.db.collection(PLAYER_ENTITY).doc(player.id);
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
