import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMatchModel } from '@deporty/entities/tournaments';

@Component({
  selector: 'app-match-summary-card',
  templateUrl: './match-summary-card.component.html',
  styleUrls: ['./match-summary-card.component.scss'],
})
export class MatchSummaryCardComponent implements OnInit {
  @Input() match!: IMatchModel;

  @Input('edit-flag') editFlag: boolean;
  @Output('on-edit-match') onEditMatch: EventEmitter<boolean>;
  constructor() {
    this.editFlag = true;
    this.onEditMatch = new EventEmitter();
  }

  ngOnInit(): void {}
}
