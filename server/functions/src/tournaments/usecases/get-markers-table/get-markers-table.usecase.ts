import { IPlayerModel } from '@deporty/entities/players';
import { Observable, of, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetPlayerByIdUsecase } from '../../../players/usecases/get-player-by-id/get-player-by-id.usecase';
import { TournamentContract } from '../../tournament.contract';

export interface StadisticResume {
  team: string;
  badge: string;
  player: string;
  goals: number;
}

export class GetMarkersTableUsecase extends Usecase<string, StadisticResume[]> {
  constructor(
    private getPlayerByIdUsecase: GetPlayerByIdUsecase,
    private tournamentContract: TournamentContract
  ) {
    super();
  }
  call(tournamentId: string): Observable<StadisticResume[]> {
    return this.tournamentContract.getByIdPopulate(tournamentId).pipe(
      map((tournament) => {
        const scorers: any = {};
        if (tournament && tournament.fixture) {
          for (const stage of tournament.fixture.stages) {
            for (const group of stage.groups) {
              if (group.matches) {
                for (const match of group.matches) {
                  if (match.stadistics) {
                    for (const playerId in match.stadistics.teamA) {
                      if (
                        Object.prototype.hasOwnProperty.call(
                          match.stadistics.teamA,
                          playerId
                        )
                      ) {
                        const playerStadistic =
                          match.stadistics.teamA[playerId];
                        if (playerStadistic.goals) {
                          if (!(playerId in scorers)) {
                            scorers[playerId] = {
                              goals: 0,
                              team: match.teamA.name,
                              teamBadge: match.teamA.shield,
                            };
                          }
                          scorers[playerId]['goals'] =
                            scorers[playerId]['goals'] +
                            playerStadistic.goals.length;
                        }
                      }
                    }


                    for (const playerId in match.stadistics.teamB) {
                      if (
                        Object.prototype.hasOwnProperty.call(
                          match.stadistics.teamA,
                          playerId
                        )
                      ) {
                        const playerStadistic =
                          match.stadistics.teamB[playerId];
                        if (playerStadistic.goals) {
                          if (!(playerId in scorers)) {
                            scorers[playerId] = {
                              goals: 0,
                              team: match.teamB.name,
                              teamBadge: match.teamB.shield,
                            };
                          }
                          scorers[playerId]['goals'] =
                            scorers[playerId]['goals'] +
                            playerStadistic.goals.length;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        const response: StadisticResume[] = [];
        for (const playerId in scorers) {
          if (Object.prototype.hasOwnProperty.call(scorers, playerId)) {
            const config = scorers[playerId];

            response.push({
              team: config.team,
              goals: config.goals,
              badge: config.teamBadge,
              player: playerId,
            });
          }
        }

        return of(response).pipe(
          map((item: StadisticResume[]) => {
            return item.map((x: StadisticResume) => {
              return this.getPlayerByIdUsecase.call(x.player).pipe(
                map((p: IPlayerModel) => {
                  return {
                    player: `${p.name} ${p.lastName}`,
                    team: x.team,
                    goals: x.goals,
                    badge: x.badge,
                  } as StadisticResume;
                })
              );
            });
          }),
          map((items: Observable<StadisticResume>[]) => {
            return !!items && items.length >0 ?  zip(...items): of([]);
          }),
          mergeMap((x) => x)
        );
      }),
      mergeMap((x) => x),
      map((items) => {
        return items.sort((prev, next) => {
          return prev.goals > next.goals ? -1 : 1;
        });
      })
    );
  }
}
