<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlayerModel } from '@deporty/entities/players';
import { IBaseResponse } from '@deporty/entities/general';
import {
  collection, getDocs
=======
import { Injectable } from '@angular/core';
import { IPlayerModel } from '@deporty/entities/players';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
>>>>>>> 137d660c63aeb0d62b71c90a6c7f51aa2d78d444
} from 'firebase/firestore/lite';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'src/app/init-app';
<<<<<<< HEAD
import { environment } from 'src/environments/environment';
import { PlayerMapper } from '../../player.mapper';
import { PlayerAdapter } from '../../player.repository';

@Injectable()
export class PlayerService extends PlayerAdapter {
  static collection = 'player';
=======
import { PlayerAdapter } from '../../player.repository';
import { PlayerMapper } from '../../player.mapper';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBaseResponse } from 'src/app/core/http/response.model';

@Injectable()
export class PlayerService extends PlayerAdapter {
  static collection = 'players';
>>>>>>> 137d660c63aeb0d62b71c90a6c7f51aa2d78d444
  constructor(
    private playerMapper: PlayerMapper,
    private httpClient: HttpClient
  ) {
    super();
  }
  public getAllSummaryPlayers(): Observable<any> {
<<<<<<< HEAD
    const playerCollections = collection(firestore, `${PlayerService.collection}s`);
=======
    const playerCollections = collection(firestore, PlayerService.collection);
>>>>>>> 137d660c63aeb0d62b71c90a6c7f51aa2d78d444

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
