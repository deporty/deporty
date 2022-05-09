import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getDownloadURL, ref } from 'firebase/storage';
import { DEFAULT_PROFILE_IMG } from 'src/app/app.constants';
import { storage } from 'src/app/init-app';
import { IPlayerModel } from '../../../models/player.model';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() player!: Partial<IPlayerModel>;

  defaultImg: string;
  img!: string;

  constructor(@Inject(MAT_DIALOG_DATA) @Optional() public data: IPlayerModel) {
    this.defaultImg = DEFAULT_PROFILE_IMG;
  }

  ngOnInit(): void {
    if (this.data && !this.player) {
      this.player = this.data;
    }

    if (this.player.image) {
      const imageRef = ref(storage, this.player.image);

      getDownloadURL(imageRef).then((data) => {
        this.img = data;
      });
    }
  }
}
