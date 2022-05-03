import { Component, Input, OnInit } from '@angular/core';
import { IGroupModel } from '../../../models/group.model';
import { IPointsStadisticsModel } from '../../../models/points-stadistics.model';
import { GetPositionsTableByGroupUsecase } from '../../../usecases/get-positions-table-by-group/get-positions-table-by-group';
import { GROUP_LETTERS } from '../components.constants';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
})
export class GroupCardComponent implements OnInit {
  letters = GROUP_LETTERS;
  results!: IPointsStadisticsModel[];

  @Input() group!: IGroupModel;

  constructor(
    private getPositionsTableByGroupUsecase: GetPositionsTableByGroupUsecase
  ) {}

  ngOnInit(): void {
    this.getPositionsTableByGroupUsecase
      .call({
        matches: this.group.matches,
      })
      .subscribe((data: IPointsStadisticsModel[]) => {
        this.results = data;
      });
  }
}
