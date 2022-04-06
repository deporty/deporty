import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayerModel } from '../../../domain/models/player.model';
import { GetAllSummaryPlayersUsecase } from '../../../domain/usecases/get-all-summary-players/get-all-summary-players.usecase';

@Component({
  selector: 'app-players-summary-list',
  templateUrl: './players-summary-list.component.html',
  styleUrls: ['./players-summary-list.component.scss'],
})
export class PlayersSummaryListComponent implements OnInit {
  static route = 'player-list';
  players!: Observable<IPlayerModel[]>;
  constructor(
    private getAllSummaryPlayersUsecase: GetAllSummaryPlayersUsecase
  ) {}

  ngOnInit(): void {
    this.players = this.getAllSummaryPlayersUsecase.call();
  }
}
