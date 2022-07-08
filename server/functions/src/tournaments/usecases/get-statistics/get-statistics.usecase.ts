import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetPlayerByIdUsecase } from '../../../players/usecases/get-player-by-id/get-player-by-id.usecase';
import { TournamentContract } from '../../tournament.contract';

export interface StadisticResume {
  team: string;
  player: string;
  goals: number;
}

export class GetStatisticsUsecase extends Usecase<string, StadisticResume> {
  constructor(
    private getPlayerByIdUsecase: GetPlayerByIdUsecase,
    private tournamentContract: TournamentContract
  ) {
    super();
  }
  call(tournamentId: string): Observable<StadisticResume> {
    // console.log(tournamentId, 'Este es el tournament id')
    return this.tournamentContract.getByIdPopulate(tournamentId).pipe(
      map((tournament) => {
        const scorers: any = {};
        console.log(tournament,'Este es el tournament ')
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

        const response = [];
        for (const playerId in scorers) {
          if (Object.prototype.hasOwnProperty.call(scorers, playerId)) {
            const config = scorers[playerId];

            response.push({
              team: config.team,
              goals: config.goals,
              player: playerId,
            });
          }
        }
        return from(response).pipe(
          map((item) => {
            return this.getPlayerByIdUsecase.call(item.player).pipe(
              map((p) => {
                return {
                  player: `${p.name} ${p.lastName}`,
                  team: item.team,
                  goals: item.goals,
                };
              })
            );
          }),
          mergeMap((x) => x)
        );
      }),
      mergeMap((x) => x)
    );
  }
}
