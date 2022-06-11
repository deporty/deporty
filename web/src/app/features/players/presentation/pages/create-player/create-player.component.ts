import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFileUsecase } from 'src/app/core/usecases/upload-file/upload-file';
import { CreatePlayerUsecase } from '../../../usecases/create-player/create-player';


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
      const filePath = `players/${value.playerData.document}/profile.jpg`;
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
