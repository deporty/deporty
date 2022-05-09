import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
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
  @Input('stage-id') stageId!: string;

  @Input() addTeamFlag;
  @Input() addMatchFlag;

  @Output('on-add-team') onAddTeam: EventEmitter<any>;
  @Output('on-add-match') onAddMatch: EventEmitter<any>;

  @ViewChild('addTeam', {
    static: false,
  })
  addTeamIcon!: MatIcon;

  @ViewChild('addMatch', {
    static: false,
  })
  addMatchIcon!: MatIcon;

  constructor(
    private getPositionsTableByGroupUsecase: GetPositionsTableByGroupUsecase
  ) {
    this.addTeamFlag = true;
    this.addMatchFlag = true;
    this.onAddTeam = new EventEmitter();
    this.onAddMatch = new EventEmitter();
  }

  addTeam() {}
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
