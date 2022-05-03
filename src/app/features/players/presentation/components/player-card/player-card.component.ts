import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlayerModel } from '../../../models/player.model';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() player!: IPlayerModel;
  constructor(@Inject(MAT_DIALOG_DATA) @Optional() public data: IPlayerModel) {}

  ngOnInit(): void {
    console.log(this.data, this.player)
    if (this.data && !this.player) {
      this.player = this.data;
    }
  }
}
