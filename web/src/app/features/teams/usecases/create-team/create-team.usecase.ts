import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getExtensionFileFromBase64 } from 'src/app/core/helpers/upload-file.helper';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { UploadFileUsecase } from 'src/app/core/usecases/upload-file/upload-file';
import { PlayerAdapter } from 'src/app/features/players/adapters/player.repository';
import { TeamAdapter } from '../../adapters/team.adapter';
import { ITeamModel } from '../../models/team.model';
import { UpdateTeamUsecase } from '../update-team/update-team.usecase';

@Injectable()
export class CreateTeamUsecase extends BaseUsecase<ITeamModel, string> {
  constructor(
    private teamAdapter: TeamAdapter,
    private uploadFileUsecase: UploadFileUsecase,
    private updateTeamUsecase: UpdateTeamUsecase
  ) {
    super();
  }

  call(team: ITeamModel): Observable<string> {
    let data!: string;
    if (team.shield) {
      data = team.shield;
      team.shield = '';
    }
    const $createdTeam = this.teamAdapter.createTeam(team);
    if (data) {
      return new Observable<string>((observer) => {
        $createdTeam.subscribe((id) => {
          const extension = getExtensionFileFromBase64(data);
          const route = `teams/${id}/brand/shield.${extension}`;
          team.id = id;
         
          this.uploadFileUsecase
            .call({
              file: data,
              filePath: route,
            })
            .subscribe(() => {
              team.shield = route;

              this.updateTeamUsecase.call(team).subscribe(() => {
                observer.next(id);
                observer.complete();
              });
            });
        });
      });
    } else {
      return $createdTeam;
    }
  }
}
