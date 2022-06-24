import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IBaseResponse } from '@deporty/entities/general';
import { IPlayerModel } from '@deporty/entities/players';
import { Observable, Subscription } from 'rxjs';
import { PlayerAdapter } from 'src/app/features/players/player.repository';
import { ITeamModel } from '../../../models/team.model';
import { CreateTeamUsecase } from '../../../usecases/create-team/create-team.usecase';


@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  static route = 'create-team';
  data = {
    audio: 'assets/athem.ogg',
    image: 'assets/general.png',
  };

  isEditable = false;

  formGroup: FormGroup;

  $players!: Observable<IBaseResponse<IPlayerModel[]>>;
  $playersSubscription!: Subscription;
  players!: IPlayerModel[];

  selectedPlayers: IPlayerModel[];

  membersFormControl: FormControl;
  status!: string;
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private playerService: PlayerAdapter,
    private createTeamUsecase: CreateTeamUsecase
  ) {
    this.selectedPlayers = [];

    this.membersFormControl = new FormControl();

    this.formGroup = new FormGroup({
      name: new FormControl(''),
      athem: new FormControl(''),
      shield: new FormControl(''),
      members: new FormControl([]),
      agent: new FormControl(''),
    });
  }

  createTeam() {
    const value: ITeamModel = this.formGroup.value;
    value['members'] = this.selectedPlayers.map((x: IPlayerModel) => {
      return {
        id: x.id,
        document: x.document || '',
        name: x.name,
        lastName: x.lastName || '',
        image: x.image || '',
      };
    });
    this.status = 'Pending';
    this.createTeamUsecase.call(value).subscribe((id) => {
      this._snackBar.open('Equipo creado correctamente', 'Cerrar');
      this.status = 'Completed';
      this.router.navigate(['./teams']);
    });
  }

  onSelectedFile($event: any) {
    this.formGroup.get('shield')?.setValue($event.url);
  }
  optionSelected(player: IPlayerModel) {
    const index = this.selectedPlayers.indexOf(player);
    if (index >= 0) {
      this.selectedPlayers.splice(index, 1);
    } else {
      this.selectedPlayers.push(player);
    }
  }
  remove(player: IPlayerModel) {
    const index = this.selectedPlayers.indexOf(player);
    if (index >= 0) {
      this.selectedPlayers.splice(index, 1);
    }
  }

  getPlayerRepr(player: IPlayerModel) {
    return `${player.name} ${player.lastName}`;
  }
  ngOnInit(): void {
    this.$players = this.playerService.getAllSummaryPlayers();
  }
}
