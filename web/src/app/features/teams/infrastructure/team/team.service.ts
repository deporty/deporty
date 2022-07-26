import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseResponse } from '@deporty/entities/general';
import { IPlayerModel } from '@deporty/entities/players';
import { IMemberModel } from '@deporty/entities/teams';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerMapper } from 'src/app/features/players/player.mapper';
import { firestore } from 'src/app/init-app';
import { environment } from 'src/environments/environment';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '@deporty/entities/teams';

@Injectable()
export class TeamService extends TeamAdapter {
  static collection = 'teams';
  constructor(
    private playerMapper: PlayerMapper,
    private httpClient: HttpClient
  ) {
    super();
  }

  asignPlayerToTeam(
    teamId: String,
    playerId: String
  ): Observable<IBaseResponse<IMemberModel>> {
    const path = `${environment.serverEndpoint}/${TeamService.collection}/assign-player`;
    return this.httpClient.put<IBaseResponse<IMemberModel>>(path, {
      teamId,
      playerId,
    });
  }

  getTeamById(teamId: string): Observable<IBaseResponse<ITeamModel>> {
    const path = `${environment.serverEndpoint}/${TeamService.collection}/${teamId}`;
    return this.httpClient.get<IBaseResponse<ITeamModel>>(path);
  }

  getTeams(): Observable<IBaseResponse<ITeamModel[]>> {
    const path = `${environment.serverEndpoint}/${TeamService.collection}`;
    return this.httpClient.get<IBaseResponse<ITeamModel[]>>(path);
  }

  createTeam(team: ITeamModel): Observable<string> {
    const teamCollection = collection(firestore, TeamService.collection);
    return from(addDoc(teamCollection, team)).pipe(
      map((data: DocumentReference<DocumentData>) => {
        return data.id;
      })
    );
  }

  deleteTeam(team: ITeamModel): Observable<void> {
    const teamCollection = doc(firestore, TeamService.collection, team.id);
    return from(deleteDoc(teamCollection));
  }

  updateTeam(team: ITeamModel): Observable<void> {
    const teamCollection = doc(firestore, TeamService.collection, team.id);
    const _team = team;
    return from(setDoc(teamCollection, _team));
  }

  getPlayersByTeam(team: ITeamModel): Observable<IPlayerModel[]> {
    const teamCollection: DocumentReference<DocumentData> = doc(
      firestore,
      TeamService.collection,
      team.id
    );

    return from(getDoc(teamCollection)).pipe(
      map((snapshot) => {
        const data = snapshot.data();
        return data
          ? data['members'].map((team: any) => this.playerMapper.fromJson(team))
          : [];
      })
    );
  }
}
