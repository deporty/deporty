import { Component, Input, OnInit } from '@angular/core';
import { IGroupModel } from '../../../models/group.model';
import { IPointsStadisticsModel } from '../../../models/points-stadistics.model';
import { GROUP_LETTERS } from '../components.constants';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
})
export class GroupCardComponent implements OnInit {
  letters = GROUP_LETTERS;
  results: IPointsStadisticsModel[];

  @Input() group!: IGroupModel;

  constructor() {
    this.results = [
      {
        team: {
          name: 'Cucos F.C.',
          id: ' aer',
          shield:
            'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/teams%2FghgnWGJjSe4mjLBo7MXL%2Fbrand%2Fshield.png?alt=media&token=d8e7b496-50fa-404e-bd35-c645ffa90952',
        },
        goalsAgainst: 4,
        goalsAgainstPerMatch: 4,
        goalsDifference: -3,
        goalsInFavor: 1,
        lostMatches: 1,
        playedMatches: 1,
        points: 0,
        tiedMatches: 0,
        wonMatches: 0,
      },
      {
        team: {
          name: 'Inter F.C.',
          id: ' aer',
          shield:
            'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/teams%2FlRUwZ5ks6HpIoayefV0C%2Fbrand%2Fshield.png?alt=media&token=5b03ce5c-42a6-4bac-9c60-c2486575669b',
        },
        goalsAgainst: 4,
        goalsAgainstPerMatch: 0,
        goalsDifference: 3,
        goalsInFavor: 4,
        lostMatches: 0,
        playedMatches: 1,
        points: 3,
        tiedMatches: 0,
        wonMatches: 1,
      },
    ].sort((a, b) => {
      return a.points < b.points ? 1 : -1;
    });
  }

  ngOnInit(): void {}
}
