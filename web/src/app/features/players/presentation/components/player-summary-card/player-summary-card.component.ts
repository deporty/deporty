import { Component, Input, OnInit } from '@angular/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { DEFAULT_PROFILE_IMG } from 'src/app/app.constants';
import { storage } from 'src/app/init-app';
import { IPlayerModel } from '@deporty/entities/players';

@Component({
  selector: 'app-player-summary-card',
  templateUrl: './player-summary-card.component.html',
  styleUrls: ['./player-summary-card.component.scss'],
})
export class PlayerSummaryCardComponent implements OnInit {
  defaultImg: string;

  @Input() player!: IPlayerModel;
  img!: string;
  constructor() {
    this.defaultImg = DEFAULT_PROFILE_IMG;
  }

  ngOnInit(): void {
    if (this.player.image) {
      const imageRef = ref(storage, this.player.image);

      getDownloadURL(imageRef).then((data) => {
        this.img = data;
      });
    }
  }
}
