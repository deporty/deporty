import { IPlayerModel } from '@deporty/entities/players';
import { ITeamModel } from '@deporty/entities/teams';
import { Observable, of, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Usecase } from '../../../core/usecase';
import { GetPlayerByDocumentUsecase } from '../../../players/usecases/get-player-by-document/get-player-by-document.usecase';
import { TeamContract } from '../../team.contract';
import { GetTeamByNameUsecase } from '../get-team-by-name/get-team-by-name.usecase';
import { PlayerIsAlreadyInTeamException } from './asign-player-to-team.exceptions';

export interface IAsignPlayerToTeam {
  teamName: string;
  player: IPlayerModel;
}

export class AsignPlayerToTeamUsecase extends Usecase<IAsignPlayerToTeam, any> {
  constructor(
    public teamContract: TeamContract,
    private getTeamByNameUsecase: GetTeamByNameUsecase,
    private getPlayerByDocumentUsecase: GetPlayerByDocumentUsecase
  ) {
    super();
  }
  call(team: IAsignPlayerToTeam): Observable<any> {
    const $getPlayerByDocumentUsecase = this.getPlayerByDocumentUsecase.call(
      team.player.document
    );

    const $getTeamByNameUsecase = this.getTeamByNameUsecase.call(team.teamName);

    return zip($getPlayerByDocumentUsecase, $getTeamByNameUsecase).pipe(
      catchError((error: any) => {
        return throwError(error);
      }),
      map((_zip: any[]) => {
        const player = _zip[0] as IPlayerModel;
        const team = _zip[1] as ITeamModel;

        if (team.members == undefined) {
          team.members = [];
        }
        const existsPlayer =
          team.members.filter((p) => {
            return p.document && p.document == player.document;
          }).length > 0;
        if (!existsPlayer) {
          team.members.push(player);
          this.teamContract.save(team)
        } else {
          return throwError(
            new PlayerIsAlreadyInTeamException(player.document)
          );
        }
        return of();
      }),
      mergeMap((x) => x)
    );
  }
}
