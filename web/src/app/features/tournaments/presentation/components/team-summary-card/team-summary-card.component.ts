import { Component, Input, OnInit } from '@angular/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { DEFAULT_SHIELD_IMG } from 'src/app/app.constants';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { storage } from 'src/app/init-app';

@Component({
  selector: 'app-team-summary-card',
  templateUrl: './team-summary-card.component.html',
  styleUrls: ['./team-summary-card.component.scss'],
})
export class TeamSummaryCardComponent implements OnInit {
  @Input() team!: ITeamModel;
  img!: string;
  defaultImg: any;
  constructor() {
    this.defaultImg = DEFAULT_SHIELD_IMG;
  }

  ngOnInit(): void {
    if (this.team.shield) {
      const imageRef = ref(storage, this.team.shield);

      getDownloadURL(imageRef).then((data) => {
        this.img = data;
      });
    }
  }
}
