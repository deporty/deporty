import { Component, Input, OnInit } from '@angular/core';
import { ITeamModel } from 'src/app/features/teams/models/team.model';

@Component({
  selector: 'app-team-summary-card',
  templateUrl: './team-summary-card.component.html',
  styleUrls: ['./team-summary-card.component.scss']
})
export class TeamSummaryCardComponent implements OnInit {

  @Input() team!: ITeamModel;
  constructor() { }

  ngOnInit(): void {
  }

}
