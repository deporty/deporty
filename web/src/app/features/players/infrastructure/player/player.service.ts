import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlayerModel } from '@deporty/entities/players';
import { IBaseResponse } from '@deporty/entities/general';
import { collection, getDocs } from 'firebase/firestore/lite';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'src/app/init-app';
import { environment } from 'src/environments/environment';
import { PlayerMapper } from '../../player.mapper';
import { PlayerAdapter } from '../../player.repository';

@Injectable()
export class PlayerService extends PlayerAdapter {
  static collection = 'players';
  constructor(
    private playerMapper: PlayerMapper,
    private httpClient: HttpClient
  ) {
    super();
  }
  public getAllSummaryPlayers(): Observable<IBaseResponse<IPlayerModel[]>> {
    const path = `${environment.serverEndpoint}/${PlayerService.collection}`;
    return this.httpClient.get<IBaseResponse<IPlayerModel[]>>(path);
  }

 public  createPlayer(player: IPlayerModel): Observable<IBaseResponse<string>> {
    const path = `${environment.serverEndpoint}/${PlayerService.collection}`;
    return this.httpClient.post<IBaseResponse<string>>(path, player);
  }

  public deletePlayerById(id: string): Observable<IBaseResponse<string>> {
    const path = `${environment.serverEndpoint}/${PlayerService.collection}/${id}`;
    return this.httpClient.delete<IBaseResponse<string>>(path);
  }
}
