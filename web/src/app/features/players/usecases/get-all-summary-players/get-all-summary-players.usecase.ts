import { Injectable } from '@angular/core';
import { PlayerAdapter } from '../../player.repository';

@Injectable()
export class GetAllSummaryPlayersUsecase {
  constructor(private playerRepository: PlayerAdapter) {}
  call() {
    return this.playerRepository.getAllSummaryPlayers();
  }
}
