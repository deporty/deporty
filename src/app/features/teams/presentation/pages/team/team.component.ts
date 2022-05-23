import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { logEvent } from 'firebase/analytics';
import { getDownloadURL, ref } from 'firebase/storage';
import { IPlayerModel } from 'src/app/features/players/models/player.model';
import { GetAllSummaryPlayersUsecase } from 'src/app/features/players/usecases/get-all-summary-players/get-all-summary-players.usecase';
import { analytics, storage } from 'src/app/init-app';
import { environment } from 'src/environments/environment';
import { ITeamModel } from '../../../models/team.model';
import { AddPlayerToTeamUsecase } from '../../../usecases/add-player-to-team/add-player-to-team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  static route = 'team';
  selectedMember: any;

  selectedPlayers: IPlayerModel[];

  membersFormControl: FormControl;

  team!: ITeamModel;
  $players: any;

  constructor(
    private activatedRoute: ActivatedRoute,

    private getAllSummaryPlayersUsecase: GetAllSummaryPlayersUsecase,
    private addPlayerToTeamUsecase: AddPlayerToTeamUsecase
  ) {
    this.membersFormControl = new FormControl();
    this.selectedPlayers = [];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((team: Params) => {
      this.team = JSON.parse(team.team) as ITeamModel;
    });

    this.$players = this.getAllSummaryPlayersUsecase.call();

    if (environment.analytics) {
      logEvent(analytics, 'team');
    }
  }

  remove(player: IPlayerModel) {
    const index = this.selectedPlayers.indexOf(player);
    if (index >= 0) {
      this.selectedPlayers.splice(index, 1);
    }
  }

  addPlayers() {
    this.addPlayerToTeamUsecase.call({
      team: this.team,
      players: this.selectedPlayers,
    });
  }
  optionSelected(player: IPlayerModel) {
    const index = this.selectedPlayers.indexOf(player);
    if (index >= 0) {
      this.selectedPlayers.splice(index, 1);
    } else {
      this.selectedPlayers.push(player);
    }
  }
}
