import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPlayerModel } from '@deporty/entities/players';
import { IStadisticSpecificationModel } from '@deporty/entities/tournaments';
import { filter } from 'rxjs/operators';
import { NewsComponent } from 'src/app/features/news/presentation/components/news/news.component';

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

  @Input('players-form') playersForm!: IPlayerModel[] | undefined;
  @Input() stadistics!: IStadisticSpecificationModel[];
  @Input() indi!: string;

  @Output('emit-data') emitData: EventEmitter<any>;

  selectedPlayers!: IPlayerModel[];
  constructor() {
    this.playersForm = [];
    this.selectedPlayers = [];
    this.emitData = new EventEmitter();
  }

  ngOnInit(): void {
    if (this.playersForm) {
      this.selectedPlayers = this.playersForm;
    }
    console.log('Los seleccionados son: ', this.selectedPlayers);

    if (!this.stadistics) {
      this.stadistics = [];
    }
  }

  isSelected(player: IPlayerModel) {
    return !!this.selectedPlayers.filter((x) => x.id === player.id).length;
  }
  getStadisticByPlayer(player: IPlayerModel): IStadisticSpecificationModel {
    const filtered = this.stadistics.filter((x) => {
      return x.player.id === player.id;
    });
    if (!!filtered.length) {
      return filtered.pop() as IStadisticSpecificationModel;
    } else {
      const newStadistic: IStadisticSpecificationModel = {
        player,
        redCards: [],
        yellowCards: [],
        totalGoals: 0,
        totalRedCards: 0,
        totalYellowCards: 0,
      };
      this.stadistics.push(newStadistic);
      return newStadistic;
    }
  }

  onAddCard(
    data: any,
    player: IPlayerModel,
    kindCard: 'redCards' | 'yellowCards'
  ) {
    const playerStadistic: IStadisticSpecificationModel =
      this.getStadisticByPlayer(player);

    const total: 'totalRedCards' | 'totalYellowCards' =
      kindCard == 'redCards' ? 'totalRedCards' : 'totalYellowCards';
    playerStadistic[kindCard] = [...data.cards];
    playerStadistic[total] = data.total as number;
    console.log(this.stadistics);
    this.emit();
  }

  onAddGoal(data: any, player: IPlayerModel) {
    const playerStadistic: IStadisticSpecificationModel =
      this.getStadisticByPlayer(player);

    playerStadistic.goals = [...data.goals];
    playerStadistic.totalGoals = data.total as number;
    console.log(this.stadistics);
    this.emit();
  }

  addGoal(player: IPlayerModel) {
    const minute = this.minute;
    const kindGoal = this.selectedKindGoal;

    this.setPlayerConfig(player);
    const prev = this.getStadisticByPlayer(player);

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
          kind: kindGoal,
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
    const index = this.selectedPlayers.findIndex((x: IPlayerModel) => {
     return x.id === player.id;
    });

    console.log(this.indi);
    
    console.log(JSON.stringify(this.selectedPlayers));
    
    console.log(player, index);
    
    if (index >= 0) {
      (this.selectedPlayers as []).splice(index, 1);
    } else {
      this.selectedPlayers.push(player);
    }
    console.log(JSON.stringify(this.selectedPlayers));
    
    this.emit();
  }

  emit() {
    this.emitData.emit({
      stadistics: this.stadistics,
      playersForm: this.selectedPlayers,
    });
  }
}
