import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersSummaryListComponent } from './ui/pages/players-summary-list/players-summary-list.component';
import { PlayersOverviewComponent } from './ui/pages/players-overview/players-overview.component';
import { CreatePlayerComponent } from './ui/pages/create-player/create-player.component';

@NgModule({
  declarations: [
    PlayersSummaryListComponent,
    PlayersOverviewComponent,
    CreatePlayerComponent
  ],
  imports: [CommonModule, PlayersRoutingModule],
})
export class PlayersModule {}
