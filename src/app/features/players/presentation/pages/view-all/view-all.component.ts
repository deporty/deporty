import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GetAllSummaryPlayersUsecase } from '../../../usecases/get-all-summary-players/get-all-summary-players.usecase';
import { IPlayerModel } from '../../../models/player.model';
import { PlayerCardComponent } from '../../components/player-card/player-card.component';
import { CreatePlayerComponent } from '../create-player/create-player.component';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss'],
})
export class ViewAllComponent implements OnInit {
  static route = 'view-all';

  formGroup: FormGroup;

  $players!: Observable<IPlayerModel[]>;
  $playersSubscription!: Subscription;
  players: IPlayerModel[];
  constructor(
    private getAllSummaryPlayersUsecase: GetAllSummaryPlayersUsecase,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.players = [];
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      id: new FormControl(''),
    });
  }
  createUser() {
    this.router.navigate([CreatePlayerComponent.route], {
      relativeTo: this.route,
    });
  }
  ngOnInit(): void {
    this.$players = this.getAllSummaryPlayersUsecase.call();
    this.$players.subscribe((data) => {
      this.players.push(...data);
    });
  }
  onSelectedPlayer(player: IPlayerModel) {
    const dialogRef = this.dialog.open(PlayerCardComponent, {
      data: player,
      maxWidth: '500px'
    });

  }
}
