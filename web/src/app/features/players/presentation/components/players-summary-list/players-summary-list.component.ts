import { Component, Input } from '@angular/core';
import { IPlayerModel } from '../../../models/player.model';

@Component({
  selector: 'app-players-summary-list',
  templateUrl: './players-summary-list.component.html',
  styleUrls: ['./players-summary-list.component.scss'],
})
export class PlayersSummaryListComponent {
  @Input() players!: Partial<IPlayerModel>[];
  selectedPlayer!: Partial<IPlayerModel>;
}
