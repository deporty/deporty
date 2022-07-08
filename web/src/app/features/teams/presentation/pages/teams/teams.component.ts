import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBaseResponse } from '@deporty/entities/general';
import { Observable } from 'rxjs';
import { hasPermission } from 'src/app/core/helpers/permission.helper';
import { RESOURCES_PERMISSIONS_IT } from 'src/app/init-app';
import { TeamAdapter } from '../../../adapters/team.adapter';
import { ITeamModel } from '../../../models/team.model';
import { DeleteTeamUsecase } from '../../../usecases/delete-team/delete-team.usecase';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  static route = 'team-list';
  options: any;
  routes: any;
  $teams!: Observable<IBaseResponse<ITeamModel[]>>;
  constructor(
    private teamAdapter: TeamAdapter,
    private deleteTeamUsecase: DeleteTeamUsecase,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(RESOURCES_PERMISSIONS_IT) private resourcesPermissions: string[]
  ) {
    this.routes = {
      zoom_in: (team: ITeamModel) => {
        console.log('Navegando, ', team.id);
        this.router.navigate(['./team', team.id], {
          relativeTo: this.route,
          // queryParams: { team: JSON.stringify(team) },
        });
      },
    };

    if (this.isAllowedToDeleteTeam()) {
      this.routes['delete'] = (team: ITeamModel) => {
        this.deleteTeamUsecase.call(team).subscribe(() => {
          this.$teams = this.teamAdapter.getTeams();
        });
      };
    }

    this.options = Object.keys(this.routes);
  }

  isAllowedToDeleteTeam() {
    const identifier = 'tournaments:delete-team:ui';
    return hasPermission(identifier, this.resourcesPermissions);
  }
  ngOnInit(): void {
    this.$teams = this.teamAdapter.getTeams();
    this.$teams.subscribe((x) => {
      console.log(x);
    });
  }

  receiveSelectedOption(option: any) {
    const key = this.options[option.index];
    this.routes[key](option.team);
  }
}
