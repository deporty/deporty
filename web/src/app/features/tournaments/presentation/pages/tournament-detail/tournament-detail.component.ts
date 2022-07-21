import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IBaseResponse } from '@deporty/entities/general';
import { ITournamentModel } from '@deporty/entities/tournaments';
import { getDownloadURL, ref } from 'firebase/storage';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { hasPermission } from 'src/app/core/helpers/permission.helper';
import { ModalComponent } from 'src/app/core/presentation/components/modal/modal.component';
import { TeamAdapter } from 'src/app/features/teams/adapters/team.adapter';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { RESOURCES_PERMISSIONS_IT, storage } from 'src/app/init-app';
import { TournamentAdapter } from '../../../adapters/tournament.adapter';
import { IFixtureStageModel } from '../../../models/fixture-stage.model';
import { IMatchModel } from '../../../models/match.model';
import { TournamentsRoutingModule } from '../../../tournaments-routing.module';
import { AddMatchToGroupUsecase } from '../../../usecases/add-match-to-group/add-match-to-group';
import { AddTeamToGroupUsecase } from '../../../usecases/add-team-to-group/add-team-to-group.usecase';
import { CreateGroupUsecase } from '../../../usecases/create-group/create-group.usecase';
import { EditMatchOfGroupUsecase } from '../../../usecases/edit-match-of-group/edit-match-of-group';
import { GetFixtureStagesUsecase } from '../../../usecases/get-fixture-stages/get-fixture-stages.usecase';
import { AddTeamCardComponent } from '../../components/add-team-card/add-team-card.component';
import { GROUP_LETTERS } from '../../components/components.constants';
import { CreateGroupComponent } from '../../components/create-group/create-group.component';
import { EditMatchCardComponent } from '../../components/edit-match-card/edit-match-card.component';
import { EditMatchComponent } from '../edit-match/edit-match.component';

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
  $teams!: Observable<IBaseResponse<ITeamModel[]>>;
  $teamSubscription!: Subscription;
  selectedTeams: any;

  markersTable: any[];

  currentIndexGroup!: number;
  stageId!: string;
  img!: string;

  constructor(
    private getFixtureStagesUsecase: GetFixtureStagesUsecase,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private teamAdapter: TeamAdapter,
    private addTeamToGroupUsecase: AddTeamToGroupUsecase,
    private createGroupUsecase: CreateGroupUsecase,
    private addMatchToGroupUsecase: AddMatchToGroupUsecase,
    private editMatchOfGroupUsecase: EditMatchOfGroupUsecase,
    private tournamentService: TournamentAdapter,
    @Inject(RESOURCES_PERMISSIONS_IT) private resourcesPermissions: string[]
  ) {
    this.statusMapper = {
      'in progress': 'En progreso',
      canceled: 'Cancelado',
    };
    this.markersTable = [];
  }
  ngOnDestroy(): void {
    if (this.$teamSubscription) {
      this.$teamSubscription.unsubscribe();
    }
  }

  isAllowedToAddMatch() {
    const identifier = 'tournaments:add-match:ui';
    return hasPermission(identifier, this.resourcesPermissions);
  }

  isAllowedToAddTeam() {
    const identifier = 'tournaments:add-team:ui';
    return hasPermission(identifier, this.resourcesPermissions);
  }

  isAllowedToEditMatch() {
    const identifier = 'tournaments:edit-match:ui';
    return hasPermission(identifier, this.resourcesPermissions);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tournamentService
        .getTournamentSummaryById(params.id)
        .subscribe((tournament) => {
          this.tournament = tournament.data;
          if (this.tournament.flayer) {
            const flayerRef = ref(storage, this.tournament.flayer);

            getDownloadURL(flayerRef).then((data) => {
              this.img = data;
            });
          }
          this.getFixtureStages();

          this.tournamentService
            .getMarkersTableByTornament(params.id)
            .subscribe((table) => {
              if (!!table) this.markersTable = table.data;
            });

          this.$teams = this.tournamentService.getAvailableTeamsToAdd(
            this.tournament.id
          );
          this.$teams.subscribe((teams) => {
            this.teams = teams.data;
          });
        });
    });
  }

  getNameByStage(index: number) {
    const orders = ['Inicial', 'Complementaria'];
    return orders[index];
  }

  registerTeamIntoTournament() {
    const dialogRef = this.dialog.open(AddTeamCardComponent, {
      width: '400px',
      height: '400px',
      data: { teams: this.teams },
    });

    dialogRef.afterClosed().subscribe((result: ITeamModel[]) => {
      const teamsToAdd = result;

      const dialogProcess = this.dialog.open(ModalComponent, {
        data: {
          kind: 'loading',
        },
      });

      if (result) {
        for (const iterator of result) {
          this.tournamentService
            .addTeamToTournament(this.tournament.id, iterator.id)
            .subscribe({
              next: (response) => {
               
                if (
                  response.meta.code == 'TOURNAMENT-TEAM-REGISTERED:SUCCESS'
                ) {
                  dialogProcess.close();

                  this.tournament.registeredTeams.push(response.data);
                  this.teams = this.teams.filter((item) => {
                    return item.id != response.data.team.id;
                  });
                  const dialogSuccess = this.dialog.open(ModalComponent, {
                    data: {
                      kind: 'text',
                      title: `El equipo ${iterator.name} se agregó correctamente.`,
                      text: 'Si no ve el equipo registrado, recargue la página por favor.',
                    },
                  });
                } else if (
                  response.meta.code == 'TOURNAMENT-TEAM-WITH-OUT-MEMBERS:ERROR'
                ) {
                  dialogProcess.close();

                  const dialogNoMebers = this.dialog.open(ModalComponent, {
                    data: {
                      kind: 'text',
                      title: `El equipo ${iterator.name} no tiene miembros.`,
                      text: 'Primero agregue los integrantes al equipo, editanto el mismo.',
                    },
                  });
                }
              },
              error: () => {},
              complete: () => {},
            });
        }
      } else {
        dialogProcess.close();
      }
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
    this.openAddTeamDialog();
  }

  onEditMatch(data: any) {
    this.router.navigate(
      [TournamentsRoutingModule.route, EditMatchComponent.route],
      {
        queryParams: {
          match: JSON.stringify(data.match),
          groupIndex: data.index,
          stageId: data.stageId,
          tournamentId: this.tournament.id,
        },
        // relativeTo: this.activatedRoute
      }
    );

    // this.stageId = data.stageId;
    // this.currentIndexGroup = data.index;
    // const teams =
    //   this.fixtureStages
    //     .filter((x) => {
    //       return x.id == this.stageId;
    //     })
    //     .pop()
    //     ?.groups.filter((x) => {
    //       return x.index == this.currentIndexGroup;
    //     })
    //     .pop()?.teams || [];

    // this.openEditMatchDialog(teams, data.match);
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

    this.openCreateMatchDialog(teams);
  }

  openAddTeamDialog(): void {
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

  openCreateMatchDialog(teams: ITeamModel[]): void {
    const dialogRef = this.dialog.open(EditMatchCardComponent, {
      width: '400px',
      height: '400px',
      data: { teams },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const match: IMatchModel = {
          teamA: result.teamA,
          teamB: result.teamB,
          date: new Date(result.date),
          // scoreÑ
        };

        if (result.scoreA >= 0 && result.scoreB >= 0) {
          match.score = {
            teamA: result.scoreA,
            teamB: result.scoreB,
          };
        }

        const group = this.fixtureStages
          .filter((x) => {
            return x.id == this.stageId;
          })
          .pop()
          ?.groups.filter((x) => {
            return x.index == this.currentIndexGroup;
          })
          .pop();
        if (group) {
          this.addMatchToGroupUsecase
            .call({
              match,
              groupIndex: group.index,
              stageIndex: this.stageId,
              tournamentId: this.tournament.id,
            })
            .subscribe(() => {
              this.getFixtureStages();
            });
        }
      }
    });
  }

  openEditMatchDialog(teams: ITeamModel[], match: IMatchModel): void {
    const dialogRef = this.dialog.open(EditMatchCardComponent, {
      width: '400px',
      height: '400px',
      data: { teams, match },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const match: IMatchModel = {
          teamA: result.teamA,
          teamB: result.teamB,
          date: new Date(result.date),
        };

        if (result.scoreA >= 0 && result.scoreB >= 0) {
          match.score = {
            teamA: result.scoreA,
            teamB: result.scoreB,
          };
        }

        const group = this.fixtureStages
          .filter((x) => {
            return x.id == this.stageId;
          })
          .pop()
          ?.groups.filter((x) => {
            return x.index == this.currentIndexGroup;
          })
          .pop();
        if (group) {
          this.editMatchOfGroupUsecase
            .call({
              match,
              groupIndex: group.index,
              stageIndex: this.stageId,
              tournamentId: this.tournament.id,
            })
            .subscribe(() => {
              this.getFixtureStages();
            });
        }
      }
    });
  }
}
