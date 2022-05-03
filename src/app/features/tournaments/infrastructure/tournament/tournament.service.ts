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
} from 'firebase/firestore/lite';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'src/app/init-app';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { IFixtureStageModel } from '../../models/fixture-stage.model';
import { IFixtureModel } from '../../models/fixture.model';
import { IMatchModel } from '../../models/match.model';
import { ITournamentModel } from '../../models/tournament.model';
import { FixtureStageMapper } from './fixture-stage.mapper';
import { MatchMapper } from './match.mapper';
import { TournamentMapper } from './tournament.mapper';

@Injectable()
export class TournamentService extends TournamentAdapter {
  static collection = 'tournaments';
  private collectionRef: CollectionReference<DocumentData>;
  constructor(
    private tournamentMapper: TournamentMapper,
    private matchMapper: MatchMapper,
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
          console.log(doc.data());
          const data = doc.data();
          return this.fixtureStageMapper.fromJson(data);
        });
      })
    );
  }
}
