import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersSummaryListComponent } from './ui/pages/players-summary-list/players-summary-list.component';
import { PlayersOverviewComponent } from './ui/pages/players-overview/players-overview.component';
import { CreatePlayerComponent } from './ui/pages/create-player/create-player.component';
import { PlayerService } from './infrastructure/services/player/player.service';
import { PlayerRepository } from './domain/repository/player.repository';
import { GetAllSummaryPlayersUsecase } from './domain/usecases/get-all-summary-players/get-all-summary-players.usecase';
import { PlayerMapper } from './infrastructure/mappers/player.mapper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    PlayersSummaryListComponent,
    PlayersOverviewComponent,
    CreatePlayerComponent,
  ],
  providers: [
    GetAllSummaryPlayersUsecase,

    PlayerMapper,
    {
      provide: PlayerRepository,
      useClass: PlayerService,
    },
  ],
  imports: [
    CommonModule,
    CoreModule,
    PlayersRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class PlayersModule {}
