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
} from 'firebase/firestore/lite';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { firestore } from 'src/app/init-app';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '../../models/team.model';
import { TeamMapper } from './team.mapper';

@Injectable()
export class TeamService extends TeamAdapter {
  static collection = 'teams';
  constructor(private teamMapper: TeamMapper) {
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
    return from(addDoc(teamCollection, this.teamMapper.toJsonDB(team))).pipe(
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
    return from(setDoc(teamCollection, team));
  }
}
