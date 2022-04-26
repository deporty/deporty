import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { db } from 'src/app/init-app';
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
    const teamsCol = collection(db, TeamService.collection);
    console.log(teamsCol)
    return from(getDocs(teamsCol)).pipe(
      map((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        return snapshot.docs
          .map((doc) => doc.data())
          .map(this.teamMapper.fromJson);
      })
    );
  }
}
