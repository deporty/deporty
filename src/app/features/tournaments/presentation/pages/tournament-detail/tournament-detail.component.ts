import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { getDownloadURL, ref } from 'firebase/storage';
import { Observable, Subscription } from 'rxjs';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { GetTeamsUsecase } from 'src/app/features/teams/usecases/get-teams/get-teams.usecase';
import { storage } from 'src/app/init-app';
import { IFixtureStageModel } from '../../../models/fixture-stage.model';
import { IPointsStadisticsModel } from '../../../models/points-stadistics.model';
import { ITournamentModel } from '../../../models/tournament.model';
import { AddTeamToGroupUsecase } from '../../../usecases/add-team-to-group/add-team-to-group.usecase';
import { CreateGroupUsecase } from '../../../usecases/create-group/create-group.usecase';
import { GetFixtureStagesUsecase } from '../../../usecases/get-fixture-stages/get-fixture-stages.usecase';
import { GetPositionsTableByGroupUsecase } from '../../../usecases/get-positions-table-by-group/get-positions-table-by-group';
import { GetTournamentInfoUsecase } from '../../../usecases/get-tournament-info/get-tournament-info';
import { AddTeamCardComponent } from '../../components/add-team-card/add-team-card.component';
import { GROUP_LETTERS } from '../../components/components.constants';
import { CreateGroupComponent } from '../../components/create-group/create-group.component';
import { EditMatchCardComponent } from '../../components/edit-match-card/edit-match-card.component';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss'],
})
export class TournamentDetailComponent implements OnInit, OnDestroy {
  static route = 'tournament-detail';

  letters = GROUP_LETTERS;

  $fixtureStages!: Observable<IFixtureStageModel[]>;
  fixtureStages!: IFixtureStageModel[];

  tournament!: ITournamentModel;
  statusMapper: any;
  teams: ITeamModel[] = [];
  $teams!: Observable<ITeamModel[]>;
  $teamSubscription!: Subscription;
  selectedTeams: any;

  currentIndexGroup!: number;
  stageId!: string;
  img!: string;

  constructor(
    private getTournamentInfoUsecase: GetTournamentInfoUsecase,
    private getFixtureStagesUsecase: GetFixtureStagesUsecase,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private getTeamsUsecase: GetTeamsUsecase,
    private addTeamToGroupUsecase: AddTeamToGroupUsecase,
    private createGroupUsecase: CreateGroupUsecase
  ) {
    this.statusMapper = {
      'in progress': 'En progreso',
      canceled: 'Cancelado',
    };
  }
  ngOnDestroy(): void {
    if (this.$teamSubscription) {
      this.$teamSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getTournamentInfoUsecase.call(params.id).subscribe((tournament) => {
        this.tournament = tournament;

        if (this.tournament.flayer) {
          const flayerRef = ref(storage, this.tournament.flayer);

          getDownloadURL(flayerRef).then((data) => {
            this.img = data;
          });
        }
        this.getFixtureStages();
      });
    });

    this.$teams = this.getTeamsUsecase.call();
    this.$teams.subscribe((teams) => {
      this.teams = teams;
    });
  }

  private getFixtureStages() {
    this.$fixtureStages = this.getFixtureStagesUsecase.call(this.tournament.id);
    this.$fixtureStages.subscribe((data: IFixtureStageModel[]) => {
      this.fixtureStages = data;

    });
  }

  onAddTeam(data: any) {
    this.stageId = data.stageId;
    this.currentIndexGroup = data.index;
    this.openDialog();
  }

  onAddMatch(data: any) {
    this.stageId = data.stageId;
    this.currentIndexGroup = data.index;
    const teams =
      this.fixtureStages
        .filter((x) => {
          return x.id == this.stageId;
        })
        .pop()
        ?.groups.filter((x) => {
          return x.index == this.currentIndexGroup;
        })
        .pop()?.teams || [];

    this.openMatchDialog(teams);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTeamCardComponent, {
      width: '400px',
      height: '400px',
      data: { teams: this.teams },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.selectedTeams = result;
      this.addTeamToGroupUsecase
        .call({
          groupIndex: this.currentIndexGroup,
          stageIndex: this.stageId,
          teams: this.selectedTeams,
          tournamentId: this.tournament.id,
        })
        .subscribe(() => {
          this.getFixtureStages();
        });
    });
  }
  openCreateGroupDialog(stageIndex: string): void {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '400px',
      height: '400px',
      data: { teams: this.teams },
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.createGroupUsecase
        .call({
          group: {
            teams: result.teams,
            label: result.label,
            matches: [],
          },
          stageIndex: stageIndex,
          tournamentId: this.tournament.id,
        })
        .subscribe(() => {
          this.getFixtureStages();
        });
    });
  }

  openMatchDialog(teams: ITeamModel[]): void {
    const dialogRef = this.dialog.open(EditMatchCardComponent, {
      width: '400px',
      height: '300px',
      data: { teams },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
