import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfrastructureModule as TeamsInfrastructureModule } from '../../teams/infrastructure/infrastructure.module';
import { TournamentAdapter } from '../adapters/tournament.adapter';

import { TournamentService } from './tournament/tournament.service';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: TournamentAdapter,
      useClass: TournamentService,
    },
  ],
  imports: [CommonModule, TeamsInfrastructureModule],
})
export class InfrastructureModule {}
