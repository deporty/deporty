import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCardComponent } from './tournament-card/tournament-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GroupCardComponent } from './group-card/group-card.component';
import { MatchCardComponent } from './match-card/match-card.component';
import { MatchSummaryCardComponent } from './match-summary-card/match-summary-card.component';
import { TeamSummaryCardComponent } from './team-summary-card/team-summary-card.component';
import { MatListModule } from '@angular/material/list';
import { PositionTableCardComponent } from './position-table-card/position-table-card.component';

const COMPONENTS = [
  TournamentCardComponent,
  GroupCardComponent,
  MatchCardComponent,
  MatchSummaryCardComponent,
  TeamSummaryCardComponent,
  PositionTableCardComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule],
})
export class ComponentsModule {}
