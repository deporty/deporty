import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadFileUsecase } from 'src/app/core/usecases/upload-file/upload-file';
import { IPlayerModel } from '../../../models/player.model';
import { CreatePlayerUsecase } from '../../../usecases/create-player/create-player';
import { PlayersSummaryListComponent } from '../../components/players-summary-list/players-summary-list.component';
import { ViewAllComponent } from '../view-all/view-all.component';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss'],
})
export class CreatePlayerComponent implements OnInit {
  static route = 'create-player';

  constructor(
    private createPlayerUsecase: CreatePlayerUsecase,
    private uploadFileUsecase: UploadFileUsecase,
    private router: Router
  ) {}

  createPlayer(value: any) {
    if (value) {
      const filePath = `players/${value.playerData.id}/profile.jpg`;
      this.uploadFileUsecase
        .call({
          file: value.img,
          filePath,
        })
        .subscribe((response) => {
          this.createPlayerUsecase.call({ ...value.playerData, image:filePath }).subscribe(()=>{
            this.router.navigate(['..'])
          });
        });
    }
  }

  ngOnInit(): void {}
}
