import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayerModel } from '@deporty/entities/players';
import { RESOURCES_PERMISSIONS_IT } from 'src/app/init-app';
import { IMatchModel } from '@deporty/entities/tournaments';
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

  playersForm!: any;
  stageId: any;
  groupIndex: any;
  tournamentId: any;

  status: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private editMatchOfGroupUsecase: EditMatchOfGroupUsecase,
    @Inject(RESOURCES_PERMISSIONS_IT) private resourcesPermissions: string[]
  ) {
    this.status = '';
    this.stadistics = {
      teamA: [],
      teamB: [],
    };
    this.playersForm = {
      teamA: [],
      teamB: [],
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((x) => {
      this.match = JSON.parse(x.match);
      console.log(this.match, 'OOO');

      this.playersForm = this.match.playerForm || this.playersForm;

      this.stadistics = this.match.stadistics || this.stadistics;

      this.stageId = x.stageId;

      this.groupIndex = x.groupIndex;

      this.tournamentId = x.tournamentId;

      this.match.date = this.match.date ? new Date(this.match.date) : undefined;

      this.playersA = this.match.teamA.members?.map((x) => x.player) || [];
   

      this.playersB = this.match.teamB.members?.map((x) => x.player) || [];


      const a = this.getDate(this.match.date);
      this.formGroup = new FormGroup({
        date: new FormControl(this.match.date),
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
      ? `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
      : '';
  }

  updateTeamA(event: any) {
    this.playersForm['teamA'] = event['playersForm'];
    this.stadistics['teamA'] = event['stadistics'];
    this.calculateGoals();
  }

  updateTeamB(event: any) {
    this.playersForm['teamB'] = event['playersForm'];
    this.stadistics['teamB'] = event['stadistics'];
    this.calculateGoals();
  }

  calculateGoals() {
    function calc(stadistics: any, team: string) {
      let teamAGoals = 0;
      for (const player in stadistics[team]) {
        if (Object.prototype.hasOwnProperty.call(stadistics[team], player)) {
          const element = stadistics[team][player];
          if ('goals' in element) {
            teamAGoals += element['goals'].length;
          }
        }
      }
      return teamAGoals;
    }

    const teamAGoals = calc(this.stadistics, 'teamA');
    const teamBGoals = calc(this.stadistics, 'teamB');

    if (this.match.score) {
      this.match.score.teamA = teamAGoals;
      this.match.score.teamB = teamBGoals;
    }
  }

  saveData() {
    this.status = 'pending';
    const date: Date = this.formGroup.get('date')?.value;
    const hourWithMinute: string = this.formGroup.get('hour')?.value;
    const hour = hourWithMinute.split(':')[0];
    const minute = hourWithMinute.split(':')[1];
    date?.setHours(parseInt(hour), parseInt(minute));
    this.editMatchOfGroupUsecase
      .call({
        groupIndex: this.groupIndex,

        match: {
          ...this.match,
          date,
          playground: this.formGroup.get('playground')?.value,
          stadistics: this.stadistics,
          playerForm: this.playersForm,
        },
        stageIndex: this.stageId,
        tournamentId: this.tournamentId,
      })
      .subscribe((x) => {
        this.router.navigate(['..'], {
          relativeTo: this.activatedRoute,
        });
      });
  }
}
