import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreatePlayerUsecase } from './create-player/create-player';
import { GetAllSummaryPlayersUsecase } from './get-all-summary-players/get-all-summary-players.usecase';



@NgModule({
  providers: [
    CreatePlayerUsecase,
    GetAllSummaryPlayersUsecase
  ],
  imports: [
    InfrastructureModule,
    CoreModule
  ]
})
export class UsecasesModule { }
