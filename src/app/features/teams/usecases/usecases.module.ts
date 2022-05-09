import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTeamsUsecase } from './get-teams/get-teams.usecase';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateTeamUsecase } from './create-team/create-team.usecase';
import { DeleteTeamUsecase } from './delete-team/delete-team.usecase';
import { UpdateTeamUsecase } from './update-team/update-team.usecase';

@NgModule({
  declarations: [],
  providers: [
    GetTeamsUsecase,
    CreateTeamUsecase,
    DeleteTeamUsecase,
    UpdateTeamUsecase,
  ],
  imports: [CommonModule, InfrastructureModule],
})
export class UsecasesModule {}
