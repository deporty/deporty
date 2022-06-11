import { Component, Input, OnInit } from '@angular/core';
import { IPointsStadisticsModel } from '../../../models/points-stadistics.model';

@Component({
  selector: 'app-position-table-card',
  templateUrl: './position-table-card.component.html',
  styleUrls: ['./position-table-card.component.scss'],
})
export class PositionTableCardComponent implements OnInit {
  @Input() results!: IPointsStadisticsModel[];
  constructor() {}

  ngOnInit(): void {}
}
