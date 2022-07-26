import { ITeamModel } from '@deporty/entities/teams';
import {
  IFixtureStageModel,
  IGroupModel,
  IMatchModel,
  ITournamentModel
} from '@deporty/entities/tournaments';
import { Observable, of, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DataSource, DataSourceFilter } from '../../../core/datasource';
import { TournamentContract } from '../../tournament.contract';
import { TournamentMapper } from '../tournament.mapper';

export class TournamentRepository extends TournamentContract {
  static entity = 'tournaments';
  constructor(
    private dataSource: DataSource<any>,
    private tournamentMapper: TournamentMapper
  ) {
    super();

    this.dataSource.entity = TournamentRepository.entity;
  }

  get(): Observable<ITournamentModel[]> {
    this.dataSource.entity = TournamentRepository.entity;

    return this.dataSource.getByFilter([]).pipe(
      map((docs) => {
        const response = docs.map((x) => {
          return this.getByIdPopulate(x.id);
        });
        return !!response && response.length > 0 ? zip(...response) : of([]);
      }),
      mergeMap((x) => x),
      map((docs) => {
        return docs as ITournamentModel[];
      })
    );
  }
  getById(id: string): Observable<ITournamentModel | undefined> {
    this.dataSource.entity = TournamentRepository.entity;

    return this.dataSource.getById(id).pipe(
      map((tournament) => {
        return tournament
          ? this.tournamentMapper.fromJson(tournament)
          : undefined;
      })
    );
  }

  getByIdPopulate(id: string): Observable<ITournamentModel | undefined> {
    this.dataSource.entity = TournamentRepository.entity;

    return this.dataSource.getByIdPopulate(id, ['fixture-stages']).pipe(
      map((tournament) => {
        return this.tournamentMapper.fromReferenceJson(tournament);
      }),
      mergeMap((x) => x),
      map((x) => {
        const temp = {
          ...x,
          fixture: {
            'fixture-stages': (x as any)['fixture-stages'],
          },
        };
        return this.tournamentMapper.fromJson(temp);
      })
      // map((tournament) => {
      //   const teams = tournament['fixture-stages'].map((fs: any) => {
      //     return fs.groups.map((g: any) => {
      //       return g.teams.map((t: DocumentReference) => {
      //         return from(t.get()).pipe(
      //           map((data) => {
      //             return {
      //               ...data.data(),
      //               id: data.id,
      //             };
      //           })
      //         );
      //       });
      //     });
      //   });

      //   return zip(teams, of(tournament));
      // }),
      // map((data: any) => {
      //   const tournament = data;
      //   if (tournament) {
      //     tournament['fixture'] = {
      //       'fixture-stages': tournament['fixture-stages'].map((x: any) => {
      //         return {
      //           ...x,
      //           groups: x.groups.map((y: any) => {
      //             return { ...y, teams: y.teams };
      //           }),
      //         };
      //       }),
      //     };

      //     const $registeredTeams = !!tournament['registered-teams']
      //       ? (tournament['registered-teams'] as []).map((register) => {
      //           const $members =
      //             !!register['members'] &&
      //             (register['members'] as []).length > 0
      //               ? zip(
      //                   ...(register['members'] as []).map((x: any) => {
      //                     return from(
      //                       (x['player'] as DocumentReference).get()
      //                     ).pipe(
      //                       map((snapshot: DocumentSnapshot<DocumentData>) => {
      //                         return {
      //                           ...snapshot.data(),
      //                           id: snapshot.id,
      //                         };
      //                       })
      //                     );
      //                   })
      //                 )
      //               : of([]);

      //           const $team = from(
      //             (register['team'] as DocumentReference).get()
      //           ).pipe(
      //             map((snapshot: DocumentSnapshot<DocumentData>) => {
      //               return {
      //                 ...snapshot.data(),
      //                 id: snapshot.id,
      //               };
      //             })
      //           );

      //           const $register = of(register);

      //           return zip($register, $members, $team).pipe(
      //             map((x: any[]) => {
      //               return {
      //                 'enrollment-date': x[0]['enrollment-date'],
      //                 team: x[2],
      //                 members: x[1],
      //               };
      //             })
      //           );
      //         })
      //       : [];

      //     if ($registeredTeams.length > 0) {
      //       return zip(of(tournament), zip(...$registeredTeams));
      //     }
      //     return of(tournament);
      //   }
      //   return of(undefined);
      // }),

      // mergeMap((x) => x),
      // map((x: any) => {
      //   let t;
      //   if (Array.isArray(x)) {
      //     t = {
      //       ...x[0],
      //       'registered-teams': x[1],
      //     };
      //   } else {
      //     t = {
      //       ...x,
      //       'registered-teams': [],
      //     };
      //   }
      //   return this.tournamentMapper.fromJson(t);
      // })
    );
  }
  getByFilter(filters: DataSourceFilter[]): Observable<ITournamentModel[]> {
    throw new Error('Method not implemented.');
  }
  save(team: any): Observable<string> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }

  update(id: string, tournament: ITournamentModel): Observable<void> {
    this.dataSource.entity = TournamentRepository.entity;

    // fs.writeFileSync('one-piece2.json', JSON.stringify(tournament, null, 2));
    const mappedTournament = this.tournamentMapper.toJson(tournament);
    // fs.writeFileSync(
    //   'one-piece.json',
    //   JSON.stringify(mappedTournament, null, 2)
    // );

    const relations = {
      'fixture-stages': {
        path: ['fixture', 'fixture-stages'],
        items: mappedTournament.fixture['fixture-stages'],
      },
    };

    return this.dataSource.update(id, mappedTournament, relations);
  }

  getAllSummaryTournaments(): Observable<ITournamentModel[]> {
    throw new Error('');

    // return from(getDocs(this.collectionRef)).pipe(
    //   map((snapshot) => {
    //     return snapshot.docs
    //       .map((doc) => {
    //         return { ...doc.data(), id: doc.id };
    //       })
    //       .map(this.tournamentMapper.fromJson);
    //   })
    // );
  }

  getTournamentSummaryById(id: string): Observable<ITournamentModel> {
    throw new Error('');

    // const docReference: DocumentReference<DocumentData> = doc(
    //   this.collectionRef,
    //   id
    // );

    // const tournamentDoc: Promise<DocumentSnapshot<DocumentData>> =
    //   getDoc(docReference);
    // return from(tournamentDoc).pipe(
    //   map((doc: DocumentSnapshot) => {
    //     return { ...doc.data(), id: doc.id };
    //   }),
    //   map(this.tournamentMapper.fromJson)
    // );
  }

  getCurrentTournamentSummaryByLocation(
    location: string
  ): Observable<ITournamentModel> {
    throw new Error('');

    // const tournamentDoc: Promise<QuerySnapshot<DocumentData>> = getDocs(
    //   query(this.collectionRef, where('location', '==', location), limit(1))
    // );
    // return from(tournamentDoc).pipe(
    //   map((doc: QuerySnapshot) => {
    //     return { ...doc.docs[0].data(), id: doc.docs[0].id };
    //   }),
    //   map(this.tournamentMapper.fromJson)
    // );
  }
  getTournamentFixtureStagesById(id: string): Observable<IFixtureStageModel[]> {
    throw new Error('');

    // const docReference1: DocumentReference<DocumentData> = doc(
    //   this.collectionRef,
    //   id
    // );

    // const a = collection(
    //   firestore,
    //   TournamentService.collection,
    //   id,
    //   'fixture-stages'
    // );

    // const docReference: Promise<QuerySnapshot<DocumentData>> = getDocs(a);

    // return from(docReference).pipe(
    //   map((snapshot: QuerySnapshot<DocumentData>) => {
    //     return snapshot.docs.map((doc) => {
    //       const data = { ...doc.data(), id: doc.id };
    //       return this.fixtureStageMapper.fromJson(data);
    //     });
    //   })
    // );
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
    throw new Error('');

    // const stageDoc = doc(
    //   firestore,
    //   TournamentService.collection,
    //   tournamentId,
    //   'fixture-stages',
    //   stageId
    // );
    // return new Observable((observer) => {
    //   from(getDoc(stageDoc)).subscribe((data) => {
    //     const docu = { ...data.data() };
    //     if (!docu.groups[groupIndex].teams) {
    //       docu.groups[groupIndex].teams = [];
    //     }

    //     if (!docu.groups[groupIndex].matches) {
    //       docu.groups[groupIndex].matches = [];
    //     }
    //     for (const team of teams) {
    //       let isExists = false;
    //       for (const _team of docu.groups[groupIndex].teams) {
    //         isExists = _team['name'] == team['name'];
    //         if (isExists) {
    //           break;
    //         }
    //       }

    //       if (!isExists) {
    //         (docu.groups[groupIndex].teams as any[]).push({
    //           id: team.id,
    //           name: team.name,
    //           shield: team.shield || '',
    //         });
    //       }
    //     }
    //     from(setDoc(stageDoc, docu)).subscribe(() => {
    //       observer.next();
    //       observer.complete();
    //     });
    //   });
    // });
  }

  createGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    group: Omit<IGroupModel, 'index'>
  ): Observable<void> {
    throw new Error('');

    // const stageDoc = doc(
    //   firestore,
    //   TournamentService.collection,
    //   tournamentId,
    //   'fixture-stages',
    //   stageId
    // );
    // return new Observable((observer) => {
    //   from(getDoc(stageDoc)).subscribe((data) => {
    //     const docu = { ...data.data() };

    //     for (const team of group.teams) {
    //       team.members = undefined;
    //     }
    //     (docu.groups as any[]).push(this.groupMapper.toJson(group as any));
    //     from(setDoc(stageDoc, docu)).subscribe(() => {
    //       observer.next();
    //       observer.complete();
    //     });
    //   });
    // });
  }

  addMatchToGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    match: IMatchModel
  ): Observable<void> {
    throw new Error('');

    // const stageDoc = doc(
    //   firestore,
    //   TournamentService.collection,
    //   tournamentId,
    //   'fixture-stages',
    //   stageId
    // );
    // return new Observable((observer) => {
    //   from(getDoc(stageDoc)).subscribe((data) => {
    //     const docu = { ...data.data() };
    //     if (!docu.groups[groupIndex].teams) {
    //       docu.groups[groupIndex].teams = [];
    //     }

    //     if (!docu.groups[groupIndex].matches) {
    //       docu.groups[groupIndex].matches = [];
    //     }
    //     const matchDB = this.matchMapper.toWeakJson(match);

    //     if (!docu.groups[groupIndex].matches) {
    //       docu.groups[groupIndex].matches = [];
    //     }
    //     let isPresent = false;

    //     for (const _match of docu.groups[groupIndex].matches) {
    //       isPresent =
    //         (_match['team-a'].name == match.teamA.name &&
    //           _match['team-b'].name == match.teamB.name) ||
    //         (_match['team-a'].name == match.teamB.name &&
    //           _match['team-b'].name == match.teamA.name);
    //       if (isPresent) {
    //         break;
    //       }
    //     }
    //     if (!isPresent) {
    //       docu.groups[groupIndex].matches.push(matchDB);

    //       from(setDoc(stageDoc, docu)).subscribe(() => {
    //         observer.next();
    //         observer.complete();
    //       });
    //     } else {
    //       observer.next();
    //       observer.complete();
    //     }
    //   });
    // });
  }

  editMatchOfGroupInsideTournament(
    tournamentId: string,
    stageId: string,
    groupIndex: number,
    match: IMatchModel
  ): Observable<void> {
    throw new Error('');

    // const stageDoc = doc(
    //   firestore,
    //   TournamentService.collection,
    //   tournamentId,
    //   'fixture-stages',
    //   stageId
    // );

    // return new Observable((observer) => {
    //   from(getDoc(stageDoc)).subscribe((data) => {
    //     const docu = { ...data.data() };

    //     const matchDB = this.matchMapper.toWeakJson(match);

    //     if (!docu.groups[groupIndex].matches) {
    //       docu.groups[groupIndex].matches = [];
    //     }
    //     let index = 0;
    //     for (const _match of [...docu.groups[groupIndex].matches]) {
    //       const isMatch =
    //         (_match['team-a'].name == match.teamA.name &&
    //           _match['team-b'].name == match.teamB.name) ||
    //         (_match['team-a'].name == match.teamB.name &&
    //           _match['team-b'].name == match.teamA.name);
    //       index += 1;

    //       if (isMatch) {
    //         break;
    //       }
    //     }
    //     index -= 1;

    //     docu.groups[groupIndex].matches[index] = matchDB;
    //     from(updateDoc(stageDoc, docu)).subscribe(() => {
    //       observer.next();
    //       observer.complete();
    //     });
    //   });
    // });
  }
}
