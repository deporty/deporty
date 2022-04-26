import { Component, Input, OnInit } from '@angular/core';
import { IPlayerModel } from '../../../models/player.model';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() player!: IPlayerModel;
  constructor() {}

  ngOnInit(): void {}
}
