import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPlayerModel } from '@deporty/entities/players';
import { IStadisticSpecificationModel } from '@deporty/entities/tournaments';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnInit {
  minute!: number;

  minuteCard!: number;
  redMinuteCard!: number;

  goalKind = ['Cabeza', 'Tiro Libre'];

  selectedKindGoal!: string;

  @Input() players!: IPlayerModel[];

  @Input('players-form') playersForm!: any[] | undefined;
  @Input() stadistics!: IStadisticSpecificationModel[];

  @Output('emit-data') emitData: EventEmitter<any>;

  selectedPlayers!: any[];
  constructor() {
    this.playersForm = [];
    this.selectedPlayers = [];
    this.emitData = new EventEmitter();
  }

  ngOnInit(): void {
    if (this.playersForm) {
      this.selectedPlayers = this.playersForm;
    }

    if (!this.stadistics) {
      this.stadistics = [];
    }

    console.log(this.stadistics);
    console.log(this.players);
  }
  getStadisticByPlayer(playerId: string): IStadisticSpecificationModel {
    const filtered = this.stadistics.filter((x) => {
      return x.player.id === playerId;
    });
    return filtered.pop() as IStadisticSpecificationModel;
  }

  addGoal(player: IPlayerModel) {
    const minute = this.minute;
    const kindGoal = this.selectedKindGoal;

    this.setPlayerConfig(player);
    const prev = this.getStadisticByPlayer(player.id);

    const existsPrev =
      !!prev && prev.goals
        ? prev['goals'].filter((x: any) => {
            return x.minute == minute;
          })
        : [];
    if (existsPrev.length == 0) {
      if (prev?.goals) {
        prev.goals.push({
          minute,
          kindGoal: kindGoal,
        });
      }
    }

    this.emitData.emit({
      stadistics: this.stadistics,
      playersForm: this.selectedPlayers,
    });
  }

  addCard(player: IPlayerModel, key: string) {
    let minute = this.minuteCard;
    if (key == 'redCards') {
      minute = this.redMinuteCard;
    }

    this.setPlayerConfig(player);

    // const existsPrev = this.stadistics[player.id][key].indexOf(minute);
    // if (existsPrev == -1) {
    //   this.stadistics[player.id][key].push(minute);
    // }

    this.emitData.emit({
      stadistics: this.stadistics,
      playersForm: this.selectedPlayers,
    });
  }

  setPlayerConfig(player: IPlayerModel) {
    // if (!(player.id in this.stadistics)) {
    //   this.stadistics[player.id] = {
    //     goals: [],
    //     redCards: [],
    //     yellowCards: [],
    //   };
    // }
  }

  selectPlayer(player: IPlayerModel) {
    const index = this.selectedPlayers.indexOf(player);

    if (index >= 0) {
      (this.selectedPlayers as []).splice(index, 1);
    } else {
      this.selectedPlayers.push(player);
    }

    this.emitData.emit({
      stadistics: this.stadistics,
      playersForm: this.selectedPlayers,
    });
  }

  deleteGoal(player: IPlayerModel, index: number) {
    // (this.stadistics[player.id]['goals'] as []).splice(index, 1);
    // this.emitData.emit({
    //   stadistics: this.stadistics,
    //   playersForm: this.selectedPlayers,
    // });
  }

  deleteCard(player: IPlayerModel, index: number, kindCard: string) {
    // (this.stadistics[player.id][kindCard] as []).splice(index, 1);
    // this.emitData.emit({
    //   stadistics: this.stadistics,
    //   playersForm: this.selectedPlayers,
    // });
  }
}
