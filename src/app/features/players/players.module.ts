import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerRepository } from './domain/adapters/player.repository';
import { GetAllSummaryPlayersUsecase } from './domain/usecases/get-all-summary-players/get-all-summary-players.usecase';
import { PlayerMapper } from './infrastructure/mappers/player.mapper';
import { PlayerService } from './infrastructure/services/player/player.service';
import { PlayersRoutingModule } from './players-routing.module';
import { PagesModule } from './presentation/pages/pages.module';

@NgModule({
  declarations: [
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
    PagesModule,
    PlayersRoutingModule,
    
  ],
  exports:[
    PagesModule
  ]
})
export class PlayersModule {}
