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
import { IMatchModel } from '../../../models/match.model';
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

  matches!: IMatchModel[];
  @Input() group!: IGroupModel;
  @Input('stage-id') stageId!: string;

  @Input('add-team-flag') addTeamFlag;
  @Input('add-match-flag') addMatchFlag;
  @Input('edit-match-flag') editMatchFlag;

  @Output('on-add-team') onAddTeam: EventEmitter<any>;
  @Output('on-add-match') onAddMatch: EventEmitter<any>;
  @Output('on-edit-match') onEditMatch: EventEmitter<any>;

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
    this.editMatchFlag = true;
    this.onAddTeam = new EventEmitter();
    this.onAddMatch = new EventEmitter();
    this.onEditMatch = new EventEmitter();
  }

  addTeam() {}
  ngOnInit(): void {
    if(this.group.matches){

      this.matches = this.group.matches?.sort((x,y)=>{
        return x.date !== undefined && y.date !== undefined && x.date > y.date ? -1 : 1
      })
    }
    this.getPositionsTableByGroupUsecase
      .call({
        matches: this.group.matches,
      })
      .subscribe((data: IPointsStadisticsModel[]) => {
        this.results = data;
      });
  }
}
