import { Component, Input, OnInit } from '@angular/core';
import { IMatchModel } from '@deporty/entities/tournaments';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {

  @Input() match!: IMatchModel;
  constructor() { }

  ngOnInit(): void {
  }

}
