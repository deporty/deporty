import { Component, Input, OnInit } from '@angular/core';
import { ITournamentModel } from '../../../models/tournament.model';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss'],
})
export class TournamentCardComponent implements OnInit {
  @Input() tournament!: ITournamentModel;
  constructor() {}

  ngOnInit(): void {}
}
