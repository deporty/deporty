import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IBaseResponse } from '@deporty/entities/general';
import { IPlayerModel } from '@deporty/entities/players';
import { Observable, Subscription } from 'rxjs';
import { hasPermission } from 'src/app/core/helpers/permission.helper';
import { RESOURCES_PERMISSIONS_IT } from 'src/app/init-app';
import { PlayerAdapter } from '../../../player.repository';
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

  $players!: Observable<IBaseResponse<IPlayerModel[]>>;
  $playersSubscription!: Subscription;
  players: IPlayerModel[];
  actions: any[];
  
  constructor(
    private playerService: PlayerAdapter,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    @Inject(RESOURCES_PERMISSIONS_IT) private resourcesPermissions: string[]
  ) {
    this.players = [];
    this.actions = [];

    const isAllowed = hasPermission(
      'players:delete-player:ui',
      this.resourcesPermissions
    );

    if (isAllowed) {
      this.actions = [
        {
          icon: 'delete',
          function: (player: IPlayerModel) => {
            this.deletePlayer(player);
          },
        },
      ];
    }
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
    this.players = [];
    this.$players = this.playerService.getAllSummaryPlayers();
    this.$players.subscribe((data) => {
      this.players.push(...data.data);
    });
  }

  deletePlayer(player: IPlayerModel) {
    this.playerService.deletePlayerById(player.id).subscribe(() => {
      this.ngOnInit();
    });
  }
  onSelectedPlayer(player: IPlayerModel) {
    const dialogRef = this.dialog.open(PlayerCardComponent, {
      data: player,
      maxWidth: '500px',
    });
  }
}
