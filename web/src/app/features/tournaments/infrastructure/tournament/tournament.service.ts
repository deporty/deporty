import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  doc,
  where,
  query,
  Query,
  limit,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { firestore } from 'src/app/init-app';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { IFixtureStageModel } from '../../models/fixture-stage.model';
import { IGroupModel } from '../../models/group.model';
import { IMatchModel } from '../../models/match.model';
import { ITournamentModel } from '../../models/tournament.model';
import { FixtureStageMapper } from './fixture-stage.mapper';
import { GroupMapper } from './group.mapper';
import { MatchMapper } from './match.mapper';
import { TournamentMapper } from './tournament.mapper';

@Injectable()
export class TournamentService extends TournamentAdapter {
  static collection = 'tournaments';
  private collectionRef: CollectionReference<DocumentData>;
  constructor(
    private tournamentMapper: TournamentMapper,
    private matchMapper: MatchMapper,
    private groupMapper: GroupMapper,
    private fixtureStageMapper: FixtureStageMapper
  ) {
    super();
    this.collectionRef = collection(firestore, TournamentService.collection);
  }
  getAllSummaryTournaments(): Observable<ITournamentModel[]> {
    return from(getDocs(this.collectionRef)).pipe(
      map((snapshot) => {
        return snapshot.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .map(this.tournamentMapper.fromJson);
      })
    );
  }

  getTournamentSummaryById(id: string): Observable<ITournamentModel> {
    const docReference: DocumentReference<DocumentData> = doc(
      this.collectionRef,
      id
    );

    const tournamentDoc: Promise<DocumentSnapshot<DocumentData>> =
      getDoc(docReference);
    return from(tournamentDoc).pipe(
      map((doc: DocumentSnapshot) => {
        return { ...doc.data(), id: doc.id };
      }),
      map(this.tournamentMapper.fromJson)
    );
  }

  getCurrentTournamentSummaryByLocation(
    location: string
  ): Observable<ITournamentModel> {
    const tournamentDoc: Promise<QuerySnapshot<DocumentData>> = getDocs(
      query(this.collectionRef, where('location', '==', location), limit(1))
    );
    return from(tournamentDoc).pipe(
      map((doc: QuerySnapshot) => {
        return { ...doc.docs[0].data(), id: doc.docs[0].id };
      }),
      map(this.tournamentMapper.fromJson)
    );
  }
  getTournamentFixtureStagesById(id: string): Observable<IFixtureStageModel[]> {
    const docReference1: DocumentReference<DocumentData> = doc(
      this.collectionRef,
      id
    );

    const a = collection(
      firestore,
      TournamentService.collection,
      id,
      'fixture-stages'
    );

    const docReference: Promise<QuerySnapshot<DocumentData>> = getDocs(a);

    return from(docReference).pipe(
      map((snapshot: QuerySnapshot<DocumentData>) => {
        return snapshot.docs.map((doc) => {
          const data = { ...doc.data(), id: doc.id };
          return this.fixtureStageMapper.fromJson(data);
        });
      })
    );
  }

  getGroupsMatchesByTournamentId(
    tournamentId: string,
    stageIndex: number,
    groupIndex: number
  ): Observable<IMatchModel[]> {
    throw new Error('Method not implemented.');
  }

  addTeamToGroupTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    teams: ITeamModel[]
  ): Observable<void> {
    const stageDoc = doc(
      firestore,
      TournamentService.collection,
      tournamentId,
      'fixture-stages',
      stageId
    );
    return new Observable((observer) => {
      from(getDoc(stageDoc)).subscribe((data) => {
        const docu = { ...data.data() };
        if (!docu.groups[groupIndex].teams) {
          docu.groups[groupIndex].teams = [];
        }

        if (!docu.groups[groupIndex].matches) {
          docu.groups[groupIndex].matches = [];
        }
        for (const team of teams) {
          let isExists = false;
          for (const _team of docu.groups[groupIndex].teams) {
            isExists = _team['name'] == team['name'];
            if (isExists) {
              break;
            }
          }

          if (!isExists) {
            (docu.groups[groupIndex].teams as any[]).push({
              id: team.id,
              name: team.name,
              shield: team.shield || '',
            });
          }
        }
        from(setDoc(stageDoc, docu)).subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }

  createGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    group: Omit<IGroupModel, 'index'>
  ): Observable<void> {
    const stageDoc = doc(
      firestore,
      TournamentService.collection,
      tournamentId,
      'fixture-stages',
      stageId
    );
    return new Observable((observer) => {
      from(getDoc(stageDoc)).subscribe((data) => {
        const docu = { ...data.data() };

        for (const team of group.teams) {
          team.members = undefined;
        }
        (docu.groups as any[]).push(this.groupMapper.toJson(group as any));
        from(setDoc(stageDoc, docu)).subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }

  addMatchToGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    match: IMatchModel
  ): Observable<void> {
    const stageDoc = doc(
      firestore,
      TournamentService.collection,
      tournamentId,
      'fixture-stages',
      stageId
    );
    return new Observable((observer) => {
      from(getDoc(stageDoc)).subscribe((data) => {
        const docu = { ...data.data() };
        if (!docu.groups[groupIndex].teams) {
          docu.groups[groupIndex].teams = [];
        }

        if (!docu.groups[groupIndex].matches) {
          docu.groups[groupIndex].matches = [];
        }
        const matchDB = this.matchMapper.toWeakJson(match);

        if (!docu.groups[groupIndex].matches) {
          docu.groups[groupIndex].matches = [];
        }
        let isPresent = false;

        for (const _match of docu.groups[groupIndex].matches) {
          isPresent =
            (_match['team-a'].name == match.teamA.name &&
              _match['team-b'].name == match.teamB.name) ||
            (_match['team-a'].name == match.teamB.name &&
              _match['team-b'].name == match.teamA.name);
          if (isPresent) {
            break;
          }
        }
        if (!isPresent) {
          docu.groups[groupIndex].matches.push(matchDB);

          from(setDoc(stageDoc, docu)).subscribe(() => {
            observer.next();
            observer.complete();
          });
        } else {
          observer.next();
          observer.complete();
        }
      });
    });
  }

  editMatchOfGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    match: IMatchModel
  ): Observable<void> {
    const stageDoc = doc(
      firestore,
      TournamentService.collection,
      tournamentId,
      'fixture-stages',
      stageId
    );

    return new Observable((observer) => {
      from(getDoc(stageDoc)).subscribe((data) => {
        const docu = { ...data.data() };

        const matchDB = this.matchMapper.toWeakJson(match);

        if (!docu.groups[groupIndex].matches) {
          docu.groups[groupIndex].matches = [];
        }
        let index = 0;
        for (const _match of [...docu.groups[groupIndex].matches]) {
          const isMatch =
            (_match['team-a'].name == match.teamA.name &&
              _match['team-b'].name == match.teamB.name) ||
            (_match['team-a'].name == match.teamB.name &&
              _match['team-b'].name == match.teamA.name);
          index += 1;

          if (isMatch) {
            break;
          }
        }
        index -= 1;

        docu.groups[groupIndex].matches[index] = matchDB;
        console.log(docu);
        from(updateDoc(stageDoc, docu)).subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }
}
