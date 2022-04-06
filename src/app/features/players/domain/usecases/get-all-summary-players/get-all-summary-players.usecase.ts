import { Injectable } from '@angular/core';
import { PlayerRepository } from '../../repository/player.repository';

@Injectable()
export class GetAllSummaryPlayersUsecase {
  constructor(private playerRepository: PlayerRepository) {}
  call() {
    return this.playerRepository.getAllSummaryPlayers();
  }
}
