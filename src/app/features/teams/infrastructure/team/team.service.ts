import { Injectable } from '@angular/core';
import {
  addDoc,
  deleteDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore/lite';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PlayerMapper } from 'src/app/features/players/infrastructure/player/player.mapper';
import { IPlayerModel } from 'src/app/features/players/models/player.model';
import { firestore } from 'src/app/init-app';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '../../models/team.model';
import { TeamMapper } from './team.mapper';

@Injectable()
export class TeamService extends TeamAdapter {
  static collection = 'teams';
  constructor(
    private teamMapper: TeamMapper,
    private playerMapper: PlayerMapper
  ) {
    super();
  }

  getTeams(): Observable<ITeamModel[]> {
    const teamsCol = collection(firestore, TeamService.collection);
    return from(getDocs(teamsCol)).pipe(
      map((snapshot) => {
        return snapshot.docs
          .map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
          .map((team) => this.teamMapper.fromJson(team));
      })
    );
  }

  createTeam(team: ITeamModel): Observable<string> {
    const teamCollection = collection(firestore, TeamService.collection);
    return from(addDoc(teamCollection, this.teamMapper.toJson(team))).pipe(
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
    const _team = this.teamMapper.toJson(team);
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
        const data = snapshot.data()
        return data
          ? data['members'].map((team: any) => this.playerMapper.fromJson(team))
          : [];
      })
    );
  }

  // addPlayerToTeam(player: IPlayerModel, team: ITeamModel): Observable<void> {
  //   const teamCollection = doc(firestore, TeamService.collection, team.id);
  //   throw new Error('Method not implemented.');
  // }
}
