import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseResponse } from '@deporty/entities/general';
import {
  IRegisteredTeamsModel,
  ITournamentModel,
} from '@deporty/entities/tournaments';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { from, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITeamModel } from '@deporty/entities/teams';
import { firestore } from 'src/app/init-app';
import { environment } from 'src/environments/environment';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import {
  IMatchModel,
  IGroupModel,
  IFixtureStageModel,
} from '@deporty/entities/tournaments';

@Injectable()
export class TournamentService extends TournamentAdapter {
  static collection = 'tournaments';
  private collectionRef: CollectionReference<DocumentData>;
  constructor(private httpClient: HttpClient) {
    super();
    this.collectionRef = collection(firestore, TournamentService.collection);
  }

  //Terminado
  addTeamToTournament(
    tournamentId: string,
    teamId: string
  ): Observable<IBaseResponse<IRegisteredTeamsModel>> {
    const path = `${environment.serverEndpoint}/${TournamentService.collection}/add-team`;
    return this.httpClient.put<IBaseResponse<IRegisteredTeamsModel>>(path, {
      tournamentId,
      teamId,
    });
  }

  //Terminado
  getAvailableTeamsToAdd(
    tournamentId: string
  ): Observable<IBaseResponse<ITeamModel[]>> {
    const path = `${environment.serverEndpoint}/${TournamentService.collection}/available-teams-to-add/${tournamentId}`;
    return this.httpClient.get<IBaseResponse<ITeamModel[]>>(path);
  }

  //Terminado
  getMarkersTableByTornament(id: string): Observable<IBaseResponse<any[]>> {
    const path = `${environment.serverEndpoint}/${TournamentService.collection}/markers-table/${id}`;
    return this.httpClient.get<IBaseResponse<any[]>>(path);
  }

  //No Terminado
  getAllSummaryTournaments(): Observable<ITournamentModel[]> {
    return from(getDocs(this.collectionRef)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as ITournamentModel;
        });
      })
    );
  }

  //Terminado
  getTournamentSummaryById(
    id: string
  ): Observable<IBaseResponse<ITournamentModel>> {
    const path = `${environment.serverEndpoint}/${TournamentService.collection}/${id}`;
    return this.httpClient.get<IBaseResponse<ITournamentModel>>(path);
  }

  //Terminado
  getCurrentTournamentSummaryByLocation(
    location: string
  ): Observable<ITournamentModel> {
    const tournamentDoc: Promise<QuerySnapshot<DocumentData>> = getDocs(
      query(this.collectionRef, where('location', '==', location), limit(1))
    );
    return from(tournamentDoc).pipe(
      map((doc: QuerySnapshot) => {
        return {
          ...doc.docs[0].data(),
          id: doc.docs[0].id,
        } as ITournamentModel;
      })
      // map(this.tournamentMapper.fromJson)
    );
  }

  //No Terminado
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
          return data as IFixtureStageModel;
        });
      })
    );
  }

  //No Terminado
  getGroupsMatchesByTournamentId(
    tournamentId: string,
    stageIndex: number,
    groupIndex: number
  ): Observable<IMatchModel[]> {
    throw new Error('Method not implemented.');
  }

  //Terminado
  addTeamToGroupTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    teams: string[]
  ): Observable<IBaseResponse<IGroupModel>> {
    const path = `${environment.serverEndpoint}/${TournamentService.collection}/add-teams-into-group`;

    return this.httpClient.put<IBaseResponse<any>>(path, {
      tournamentId,
      stageId,
      groupIndex,
      teamIds: teams,
    });
  }

  //No Terminado
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
        if (!docu.groups) {
          docu.groups = [];
        }
        (docu.groups as any[]).push(group as any);
        from(setDoc(stageDoc, docu)).subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }

  //Terminado
  addMatchToGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    teamAId: string,
    teamBId: string,
    date: Date | undefined
  ): Observable<IBaseResponse<IFixtureStageModel>> {
    const path = `${environment.serverEndpoint}/${TournamentService.collection}/add-match`;

    return this.httpClient.put<IBaseResponse<IFixtureStageModel>>(path, {
      tournamentId,
      stageId,
      groupIndex,
      teamAId,
      teamBId,
      date: !!date ? date.getTime() : undefined,
    });
  }

  //Terminado
  editMatchOfGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    match: IMatchModel
  ): Observable<IBaseResponse<IFixtureStageModel>> {
    const path = `${environment.serverEndpoint}/${TournamentService.collection}/edit-match-into-group`;

    return this.httpClient.put<IBaseResponse<IFixtureStageModel>>(path, {
      tournamentId,
      stageId,
      groupIndex,
      match: {
        ...match,
        date: !!match.date ? match.date?.getTime() / 1000 : undefined,
      },
    });
  }
}
