import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTournamentComponent } from './presentation/pages/create-tournament/create-tournament.component';
import { CurrentTournamentComponent } from './presentation/pages/current-tournament/current-tournament.component';
import { TournamentDetailComponent } from './presentation/pages/tournament-detail/tournament-detail.component';
import { TournamentListComponent } from './presentation/pages/tournament-list/tournament-list.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentTournamentComponent
  },
  {
    path: CurrentTournamentComponent.route,
    component: CurrentTournamentComponent
  },
  {
    path: CreateTournamentComponent.route,
    component: CreateTournamentComponent
  },
  {
    path: TournamentListComponent.route,
    component: TournamentListComponent
  },
  {
    path: TournamentDetailComponent.route,
    component: TournamentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsRoutingModule {
  static route = 'tournaments';
}
