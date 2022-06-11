import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerAdapter } from '../player.repository';
import { PlayerService } from './player/player.service';
import { HttpClientModule } from '@angular/common/http';
import { PlayerMapper } from '../player.mapper';



@NgModule({
  providers: [
    PlayerMapper,
    {
      provide: PlayerAdapter,
      useClass: PlayerService
    }
  ],
  imports: [
    HttpClientModule
  ]
})
export class InfrastructureModule { }
