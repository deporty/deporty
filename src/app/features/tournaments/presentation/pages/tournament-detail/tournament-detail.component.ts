import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { IFixtureStageModel } from '../../../models/fixture-stage.model';
import { IPointsStadisticsModel } from '../../../models/points-stadistics.model';
import { ITournamentModel } from '../../../models/tournament.model';
import { GetFixtureStagesUsecase } from '../../../usecases/get-fixture-stages/get-fixture-stages.usecase';
import { GetPositionsTableByGroupUsecase } from '../../../usecases/get-positions-table-by-group/get-positions-table-by-group';
import { GetTournamentInfoUsecase } from '../../../usecases/get-tournament-info/get-tournament-info';
import { GROUP_LETTERS } from '../../components/components.constants';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss'],
})
export class TournamentDetailComponent implements OnInit {
  static route = 'tournament-detail';

  letters = GROUP_LETTERS;

  $fixtureStages!: Observable<IFixtureStageModel[]>;
  fixtureStages!: IFixtureStageModel[];

  tournament!: ITournamentModel;
  statusMapper: any;
  teams: ITeamModel[] = [
    {
      id: '1',
      name: 'Cucos',
      shield:
        'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/teams%2FghgnWGJjSe4mjLBo7MXL%2Fbrand%2Fshield.png?alt=media&token=d8e7b496-50fa-404e-bd35-c645ffa90952',
    },
    {
      id: '2',
      name: 'Inter',
      shield:
        'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/teams%2FlRUwZ5ks6HpIoayefV0C%2Fbrand%2Fshield.png?alt=media&token=5b03ce5c-42a6-4bac-9c60-c2486575669b',
    },
    {
      id: '3',
      name: 'Rusos',
      shield:
        'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/teams%2FghgnWGJjSe4mjLBo7MXL%2Fbrand%2Fshield.png?alt=media&token=d8e7b496-50fa-404e-bd35-c645ffa90952',
    },
  ];
  constructor(
    private getTournamentInfoUsecase: GetTournamentInfoUsecase,
    private getFixtureStagesUsecase: GetFixtureStagesUsecase,
    private activatedRoute: ActivatedRoute
  ) {
    this.statusMapper = {
      'in progress': 'En progreso',
      canceled: 'Cancelado',
    };

   
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getTournamentInfoUsecase.call(params.id).subscribe((tournament) => {
        this.tournament = tournament;
      });
      this.$fixtureStages = this.getFixtureStagesUsecase.call(params.id);
      this.$fixtureStages.subscribe((data: IFixtureStageModel[]) => {
        this.fixtureStages = data;
       
      });
    });
  }
}
