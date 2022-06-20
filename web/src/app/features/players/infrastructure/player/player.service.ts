import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlayerModel } from '@deporty/entities/players';
import { IBaseResponse } from '@deporty/entities/general';
import {
  collection, getDocs
} from 'firebase/firestore/lite';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'src/app/init-app';
import { environment } from 'src/environments/environment';
import { PlayerMapper } from '../../player.mapper';
import { PlayerAdapter } from '../../player.repository';

@Injectable()
export class PlayerService extends PlayerAdapter {
  static collection = 'player';
  constructor(
    private playerMapper: PlayerMapper,
    private httpClient: HttpClient
  ) {
    super();
  }
  public getAllSummaryPlayers(): Observable<any> {
    const playerCollections = collection(firestore, `${PlayerService.collection}s`);

    return from(getDocs(playerCollections)).pipe(
      map((citySnapshot) => {
        const response = citySnapshot.docs
          .map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
          .map(this.playerMapper.fromJson);
        return response;
      })
    );
  }

  createPlayer(player: IPlayerModel): Observable<string> {
    const path = `${environment.serverEndpoint}/${PlayerService.collection}`;
    return this.httpClient.post<IBaseResponse>(path, player).pipe(
      map((response) => {
        return response.data;
      })
    );
    // const playerCollections = collection(firestore, PlayerService.collection);

    // return from(
    //   addDoc(playerCollections, this.playerMapper.toJson(player))
    // ).pipe(
    //   map((data: DocumentReference<DocumentData>) => {
    //     return data.id;
    //   })
    // );
  }
}
