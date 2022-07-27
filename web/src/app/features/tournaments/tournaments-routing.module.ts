import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTournamentComponent } from './presentation/pages/create-tournament/create-tournament.component';
import { EditMatchComponent } from './presentation/pages/edit-match/edit-match.component';
import { CurrentTournamentComponent } from './presentation/pages/index-tournament/index-tournament.component';
import { TournamentDetailComponent } from './presentation/pages/tournament-detail/tournament-detail.component';
import { TournamentListComponent } from './presentation/pages/tournament-list/tournament-list.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentTournamentComponent,
    data: {
      display: 'Torneos',
    },
  },
  {
    path: CurrentTournamentComponent.route,
    component: CurrentTournamentComponent,
  },

  {
    path: TournamentListComponent.route,
    component: TournamentListComponent,
  },
  {
    path: TournamentDetailComponent.route,
    component: TournamentDetailComponent,
  },

  {
    path: `${TournamentDetailComponent.route}/${EditMatchComponent.route}`,
    component: EditMatchComponent,
  },
  {
    path: CreateTournamentComponent.route,
    component: CreateTournamentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsRoutingModule {
  static route = 'tournaments';
  static display = 'Torneos';
}
