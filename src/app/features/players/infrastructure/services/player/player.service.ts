import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'src/app/init-app';
import { PlayerRepository } from '../../../domain/adapters/player.repository';
import { PlayerMapper } from '../../mappers/player.mapper';

@Injectable()
export class PlayerService extends PlayerRepository {
  static collection = 'players';
  constructor(private playerMapper: PlayerMapper) {
    super();
  }
  public getAllSummaryPlayers(): Observable<any> {
    const citiesCol = collection(firestore, PlayerService.collection);

    return from(getDocs(citiesCol)).pipe(
      map((citySnapshot) => {
        console.log(citySnapshot.docs.map((doc) => doc.data()));
        return citySnapshot.docs
          .map((doc) => doc.data())
          .map(this.playerMapper.fromJson);
      })
    );
  }
}
