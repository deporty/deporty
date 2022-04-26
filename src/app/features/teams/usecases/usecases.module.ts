import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTeamsUsecase } from './get-teams/get-teams.usecase';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@NgModule({
  declarations: [],
  providers: [GetTeamsUsecase],
  imports: [CommonModule, InfrastructureModule],
})
export class UsecasesModule {}
