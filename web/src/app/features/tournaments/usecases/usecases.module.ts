import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllSummaryTournamentsUsecase } from './get-all-summary-tournaments/get-all-summary-tournaments';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { GetCurrentTournamentUsecase } from './get-current-tournament/get-current-tournament';
import { CreateFixtureUsecase } from './create-fixture/create-fixture';
import { GetFixtureStagesUsecase } from './get-fixture-stages/get-fixture-stages.usecase';
import { GetPositionsTableByGroupUsecase } from './get-positions-table-by-group/get-positions-table-by-group';
import { CreateGroupUsecase } from './create-group/create-group.usecase';

@NgModule({
  declarations: [],
  providers: [
    GetAllSummaryTournamentsUsecase,
    GetCurrentTournamentUsecase,
    CreateFixtureUsecase,
    GetFixtureStagesUsecase,
    GetPositionsTableByGroupUsecase,
    CreateGroupUsecase,
  ],
  imports: [CommonModule, InfrastructureModule],
})
export class UsecasesModule {}
