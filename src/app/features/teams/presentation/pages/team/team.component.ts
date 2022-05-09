import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { logEvent } from 'firebase/analytics';
import { getDownloadURL, ref } from 'firebase/storage';
import { IPlayerModel } from 'src/app/features/players/models/player.model';
import { analytics, storage } from 'src/app/init-app';
import { environment } from 'src/environments/environment';
import { ITeamModel } from '../../../models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  static route = 'team';
  selectedMember: any;

  team!: ITeamModel;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((team: Params) => {
      this.team = JSON.parse(team.team) as ITeamModel;
    });
    if (environment.analytics) {
      logEvent(analytics, 'team');
    }
  }
}
