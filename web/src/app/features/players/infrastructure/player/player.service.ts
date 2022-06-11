import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import { getDownloadURL, getMetadata, ref } from 'firebase/storage';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BUCKET_NAME } from 'src/app/app.constants';
import { firestore, storage } from 'src/app/init-app';
import { PlayerAdapter } from '../../adapters/player.repository';
import { IPlayerModel } from '../../models/player.model';
import { PlayerMapper } from './player.mapper';

@Injectable()
export class PlayerService extends PlayerAdapter {
  static collection = 'players';
  constructor(private playerMapper: PlayerMapper) {
    super();
  }
  public getAllSummaryPlayers(): Observable<any> {
    const playerCollections = collection(firestore, PlayerService.collection);

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
    const playerCollections = collection(firestore, PlayerService.collection);

    return from(
      addDoc(playerCollections, this.playerMapper.toJson(player))
    ).pipe(
      map((data: DocumentReference<DocumentData>) => {
        return data.id;
      })
    );
  }
}
