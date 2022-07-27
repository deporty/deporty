import { ITeamModel } from '@deporty/entities/teams';
import { IStadisticSpecificationModel } from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { TournamentContract } from '../../tournament.contract';

export interface StadisticResume {
  team: string;
  shield: string;
  player: string;
  goals: number;
}

export class GetMarkersTableUsecase extends Usecase<string, StadisticResume[]> {
  constructor(private tournamentContract: TournamentContract) {
    super();
  }
  call(tournamentId: string): Observable<StadisticResume[]> {
    return this.tournamentContract.getByIdPopulate(tournamentId).pipe(
      map((tournament) => {
        const scorers: any[] = [];
        if (tournament && tournament.fixture) {
          for (const stage of tournament.fixture.stages) {
            for (const group of stage.groups) {
              if (group.matches) {
                for (const match of group.matches) {
                  if (match.stadistics) {
                    newFunction(match.stadistics.teamA, match.teamA, scorers);
                    newFunction(match.stadistics.teamB, match.teamB, scorers);
                  }
                }
              }
            }
          }
        }

        const response: StadisticResume[] = scorers;

        return response.sort((prev, next) => {
          return prev.goals > next.goals ? -1 : 1;
        });
      })
    );

    function findStadisticInScores(
      scorers: any[],
      playerStadistic: IStadisticSpecificationModel
    ) {
      const response = scorers.filter((x) => {
        return x.player === playerStadistic.player;
      });
      return response.length === 1 ? response.pop() : null;
    }

    function newFunction(
      stadisticsByTeam: IStadisticSpecificationModel[] | undefined,
      team: ITeamModel,
      scorers: any[]
    ) {
      if (!!stadisticsByTeam) {
        for (const playerStadistic of stadisticsByTeam) {
          if (playerStadistic.goals) {
            let stadistic = findStadisticInScores(scorers, playerStadistic);
            if (!stadistic) {
              stadistic = {
                player: playerStadistic.player,
                goals: 0,
                team: team.name,
                teamShield: team.shield,
              };
              scorers.push(stadistic);
            }
            stadistic['goals'] =
              stadistic['goals'] + playerStadistic.totalGoals;
          }
        }
      }
    }
  }
}
