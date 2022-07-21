import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IPlayerModel } from '@deporty/entities/players';
import { logEvent } from 'firebase/analytics';
import { PlayerAdapter } from 'src/app/features/players/player.repository';
import { analytics } from 'src/app/init-app';
import { environment } from 'src/environments/environment';
import { TeamAdapter } from '../../../adapters/team.adapter';
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

  availablePlayers: IPlayerModel[];
  constructor(
    private activatedRoute: ActivatedRoute,

    private playerService: PlayerAdapter,
    private teamService: TeamAdapter,
    private addPlayerToTeamUsecase: AddPlayerToTeamUsecase
  ) {
    this.membersFormControl = new FormControl();
    this.selectedPlayers = [];
    this.availablePlayers = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.teamService.getTeamById(params.id).subscribe((team) => {
        this.team = team.data;
      });
    });

    this.playerService.getAllSummaryPlayers().subscribe((p) => {
      this.availablePlayers = p.data;
    });

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
    for (const player of this.selectedPlayers) {
      this.teamService
        .asignPlayerToTeam(this.team.id, player.id)
        .subscribe((data) => {
          if (data.meta.code == 'TEAM-PLAYER-ASSIGNED:SUCCESS') {
            this.team.members?.push(data.data);
          }
        });
    }
    this.selectedPlayers = [];
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
