import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayersSummaryListComponent } from './ui/pages/players-summary-list/players-summary-list.component';

const routes: Routes = [
  {
    path: PlayersSummaryListComponent.route,
    component: PlayersSummaryListComponent,
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
