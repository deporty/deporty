import { Observable, of } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { TournamentAdapter } from '../../adapters/tournament.adapter';
import { IMatchModel } from '../../models/match.model';
import { IPointsStadisticsModel } from '../../models/points-stadistics.model';

export interface Params {
  matches?: IMatchModel[];
  tournamentId?: string;
  groupIndex?: string;
  stageIndex?: string;
}
export class GetPositionsTableByGroupUsecase extends BaseUsecase<
  Params,
  IPointsStadisticsModel[]
> {
  constructor() {
    super();
  }

  call(param: Params): Observable<IPointsStadisticsModel[]> {
    type Stadistics = Omit<IPointsStadisticsModel, 'team'>;

    const defaultStadistics: Stadistics = {
      goalsAgainst: 0,
      goalsAgainstPerMatch: 0,
      goalsDifference: 0,
      goalsInFavor: 0,
      lostMatches: 0,
      playedMatches: 0,
      points: 0,
      tiedMatches: 0,
      wonMatches: 0,
    };
    const table: {
      [index: string]: Stadistics;
    } = {};
    const teams: any = {};
    if (param.matches) {
      for (const match of param.matches) {
        const teamAName = match.teamA.name;
        const teamBName = match.teamB.name;

        if (!(teamAName in table)) {
          table[teamAName] = { ...defaultStadistics };
          teams[teamAName] = match.teamA;
        }

        if (!(teamBName in table)) {
          table[teamBName] = { ...defaultStadistics };
          teams[teamBName] = match.teamB;
        }

        const winnerTeam = this.getWinnerTeam(match as Required<IMatchModel>);

        if (winnerTeam !== undefined) {
          table[teamAName].playedMatches = table[teamAName].playedMatches + 1;
          table[teamBName].playedMatches = table[teamBName].playedMatches + 1;

          if (match.score) {
            table[teamAName].goalsAgainst =
              table[teamAName].goalsAgainst + match.score.teamB;
            table[teamBName].goalsAgainst =
              table[teamBName].goalsAgainst + match.score.teamA;

            table[teamAName].goalsInFavor =
              table[teamAName].goalsInFavor + match.score.teamA;
            table[teamBName].goalsInFavor =
              table[teamBName].goalsInFavor + match.score.teamB;

            table[teamAName].goalsDifference =
              table[teamAName].goalsDifference +
              match.score.teamA -
              match.score.teamB;
            table[teamBName].goalsDifference =
              table[teamBName].goalsDifference +
              match.score.teamB -
              match.score.teamA;
          }

          if (winnerTeam) {
            table[winnerTeam.winner].points =
              table[winnerTeam.winner].points + 3;

            table[winnerTeam.winner].wonMatches =
              table[winnerTeam.winner].wonMatches + 1;
            table[winnerTeam.loser].lostMatches =
              table[winnerTeam.loser].lostMatches + 1;
          } else if (winnerTeam === null) {
            table[teamAName].tiedMatches = table[teamAName].tiedMatches + 1;

            table[teamBName].tiedMatches = table[teamBName].tiedMatches + 1;

            table[teamBName].points = table[teamBName].points + 1;
            table[teamAName].points = table[teamAName].points + 1;
          }
        }
      }
    }

    return of(
      Object.keys(table)
        .map((entry: string) => {
          const value = table[entry];
          return {
            team: teams[entry],
            ...value,
            goalsAgainstPerMatch:
              Math.trunc((value.goalsAgainst / value.playedMatches) * 100) /
              100,
          } as IPointsStadisticsModel;
        })
        .sort((prev, next) => {
          if (prev.points < next.points) {
            return 1;
          } else if (prev.points > next.points) {
            return -1;
          } else {
            if (prev.goalsDifference < next.goalsDifference) {
              return 1;
            } else if (prev.goalsDifference > next.goalsDifference) {
              return -1;
            } else {
              if (prev.goalsInFavor < next.goalsInFavor) {
                return 1;
              } else if (prev.goalsInFavor > next.goalsInFavor) {
                return -1;
              } else {
                return 1;
              }
            }
          }
        })
    );
  }
  getWinnerTeam(match: Required<IMatchModel>) {
    let response = undefined;
    if (
      match.score &&
      match.score.teamA &&
      match.score.teamB &&
      typeof match.score.teamA == 'number' &&
      typeof match.score.teamB == 'number'
    ) {
      if (match.score.teamA < match.score.teamB) {
        response = {
          winner: match.teamB.name,
          loser: match.teamA.name,
        };
      } else if (match.score.teamA > match.score.teamB) {
        response = {
          winner: match.teamA.name,
          loser: match.teamB.name,
        };
      } else {
        response = null;
      }
    }

    return response;
  }
}
