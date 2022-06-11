import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DEFAULT_PROFILE_IMG } from 'src/app/app.constants';
import { IPlayerModel } from '../../../models/player.model';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
})
export class PlayersTableComponent implements OnInit {
  @Input() players!: IPlayerModel[];

  @Output() onSelectedPlayer = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {}
}
