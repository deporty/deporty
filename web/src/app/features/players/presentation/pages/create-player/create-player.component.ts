import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Store } from '@ngrx/store';
import { UploadFileUsecase } from 'src/app/core/usecases/upload-file/upload-file';
import { CreatePlayerUsecase } from '../../../usecases/create-player/create-player';
import { IPlayerState } from '../../player.states';
import { GET_ALL_USERS_ACTION } from '../../players.actions';
=======
import { UploadFileUsecase } from 'src/app/core/usecases/upload-file/upload-file';
import { CreatePlayerUsecase } from '../../../usecases/create-player/create-player';

>>>>>>> 137d660c63aeb0d62b71c90a6c7f51aa2d78d444

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
<<<<<<< HEAD
    private router: Router,
    private store: Store<IPlayerState>
  ) {}

  createPlayer(value: any) {
    console.log(value);
=======
    private router: Router
  ) {}

  createPlayer(value: any) {
>>>>>>> 137d660c63aeb0d62b71c90a6c7f51aa2d78d444
    if (value) {
      const filePath = `players/${value.playerData.document}/profile.jpg`;
      this.uploadFileUsecase
        .call({
          file: value.img,
          filePath,
        })
<<<<<<< HEAD
        .subscribe(
          (response) => {
            console.log(response)
            this.createPlayerUsecase
              .call({ ...value.playerData, image: filePath })
              .subscribe(() => {
                this.router.navigate(['..']);
              });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  ngOnInit(): void {
    this.store.dispatch(
      GET_ALL_USERS_ACTION({ usernamae: 'username', password: 'password' })
    );
  }
=======
        .subscribe((response) => {
          this.createPlayerUsecase.call({ ...value.playerData, image:filePath }).subscribe(()=>{
            this.router.navigate(['..'])
          });
        });
    }
  }

  ngOnInit(): void {}
>>>>>>> 137d660c63aeb0d62b71c90a6c7f51aa2d78d444
}
