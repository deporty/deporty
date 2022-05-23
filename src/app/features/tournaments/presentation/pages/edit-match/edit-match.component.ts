import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPlayerModel } from 'src/app/features/players/models/player.model';
import { GetPlayersByTeamUsecase } from 'src/app/features/teams/usecases/get-players-by-team/get-players-by-team';
import { RESOURCES_PERMISSIONS_IT } from 'src/app/init-app';
import { IMatchModel } from '../../../models/match.model';
import { EditMatchOfGroupUsecase } from '../../../usecases/edit-match-of-group/edit-match-of-group';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.scss'],
})
export class EditMatchComponent implements OnInit {
  static route = 'edit-match';

  formGroup!: FormGroup;

  match!: IMatchModel;
  playersA!: IPlayerModel[];
  playersB!: IPlayerModel[];

  goalKind = ['Cabeza', 'Tiro Libre'];

  minute!: number;
  minuteCard!: number;
  redMinuteCard!: number;

  selectedKindGoal!: string;

  stadistics: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private editMatchOfGroupUsecase: EditMatchOfGroupUsecase,
    private getPlayersByTeamUsecase: GetPlayersByTeamUsecase,
    @Inject(RESOURCES_PERMISSIONS_IT) private resourcesPermissions: string[]
  ) {
    this.stadistics = {};
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((x) => {
      this.match = JSON.parse(x.match);
      this.match.date = this.match.date ? new Date(this.match.date) : undefined;
      console.log(this.match);

      this.getPlayersByTeamUsecase.call(this.match.teamA).subscribe((data) => {
        console.log(data);
        this.playersA = data;
      });

      this.getPlayersByTeamUsecase.call(this.match.teamB).subscribe((data) => {
        this.playersB = data;
      });

      this.formGroup = new FormGroup({
        date: new FormControl(this.getDate(this.match.date)),
        hour: new FormControl(this.getHour(this.match.date)),
        playground: new FormControl(this.match.playground || ''),
      });
    });
  }

  getHour(date?: Date) {
    return date ? `${date.getHours()}:${date.getMinutes()}` : '';
  }

  getDate(date?: Date) {
    return date
      ? `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
      : '';
  }

  editGoal() {}

  setPlayerConfig(player: IPlayerModel) {
    if (!(player.id in this.stadistics)) {
      this.stadistics[player.id] = {
        goals: [],
        redCards: [],
        yellowCards: [],
      };
    }
  }
  addGoal(player: IPlayerModel) {
    const minute = this.minute;
    const kindGoal = this.selectedKindGoal;

    console.log(minute, kindGoal, player);

    this.setPlayerConfig(player);

    const existsPrev = this.stadistics[player.id]['goals'].filter((x: any) => {
      x.minute == minute;
    });
    console.log(existsPrev);
    if (existsPrev.length == 0) {
      this.stadistics[player.id]['goals'].push({
        minute,
        'kind-goal': kindGoal,
      });
    }
  }

  addCard(player: IPlayerModel, key: string) {
    let minute = this.minuteCard;
    if (key == 'redCards') {
      minute = this.redMinuteCard;
    }

    this.setPlayerConfig(player);

    const existsPrev = this.stadistics[player.id][key].filter((x: any) => {
      x.minute == minute;
    });
    console.log(existsPrev);
    if (existsPrev.length == 0) {
      this.stadistics[player.id][key].push(minute);
    }
  }
}
