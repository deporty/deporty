import { Component, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlayerModel } from '@deporty/entities/players';
import { getDownloadURL, ref } from 'firebase/storage';
import { DEFAULT_PROFILE_IMG } from 'src/app/app.constants';
import { storage } from 'src/app/init-app';


@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnChanges {
  @Input() player!: Partial<IPlayerModel>;

  defaultImg: string;
  img!: string;

  constructor(@Inject(MAT_DIALOG_DATA) @Optional() public data: IPlayerModel) {
    this.defaultImg = DEFAULT_PROFILE_IMG;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.update()
  }

  update(){
    if (this.data && !this.player) {
      this.player = this.data;
    }
    console.log(this.player)

    if (this.player.image) {
      const imageRef = ref(storage, this.player.image);

      getDownloadURL(imageRef).then((data) => {
        this.img = data;
      });
    }
  }

  ngOnInit(): void {
    this.update()
  }
}
