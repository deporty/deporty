import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateTeamUsecase } from './create-team/create-team.usecase';
import { DeleteTeamUsecase } from './delete-team/delete-team.usecase';
import { UpdateTeamUsecase } from './update-team/update-team.usecase';
import { AddPlayerToTeamUsecase } from './add-player-to-team/add-player-to-team';

@NgModule({
  declarations: [],
  providers: [
    CreateTeamUsecase,
    DeleteTeamUsecase,
    UpdateTeamUsecase,
    AddPlayerToTeamUsecase,
  ],
  imports: [CommonModule, InfrastructureModule],
})
export class UsecasesModule {}
