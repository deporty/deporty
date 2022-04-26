import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayersSummaryListComponent } from './presentation/pages/players-summary-list/players-summary-list.component';
import { CreatePlayerComponent } from './presentation/pages/create-player/create-player.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersSummaryListComponent,
  },

  {
    path: PlayersSummaryListComponent.route,
    component: PlayersSummaryListComponent,
  },
  {
    path: CreatePlayerComponent.route,
    component: CreatePlayerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {
  static route = 'players';
}
