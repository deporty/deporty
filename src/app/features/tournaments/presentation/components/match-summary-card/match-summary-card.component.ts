import { Component, Input, OnInit } from '@angular/core';
import { IMatchModel } from '../../../models/match.model';

@Component({
  selector: 'app-match-summary-card',
  templateUrl: './match-summary-card.component.html',
  styleUrls: ['./match-summary-card.component.scss'],
})
export class MatchSummaryCardComponent implements OnInit {
  @Input() match!: IMatchModel;

  constructor() {}

  ngOnInit(): void {}
}
