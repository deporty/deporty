import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from 'src/app/core/guards/is-logged-in/is-logged-in.guard';
import { CreateTeamComponent } from './presentation/pages/create-team/create-team.component';
import { TeamComponent } from './presentation/pages/team/team.component';
import { TeamsComponent } from './presentation/pages/teams/teams.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    pathMatch: 'full',
  },
  {
    path: TeamComponent.route,
    component: TeamComponent,
    pathMatch: 'full',
  },

  {
    path: TeamsComponent.route,
    component: TeamsComponent,
    pathMatch: 'full',
  },
  {
    path: CreateTeamComponent.route,
    component: CreateTeamComponent,
    canActivate: [IsLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {
  static route = 'teams';
}
