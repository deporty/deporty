import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamAdapter } from '../adapters/team.adapter';
import { TeamService } from './team/team.service';
import { InfrastructureModule as PlayerInfrastructureModule } from "../../players/infrastructure/infrastructure.module";



@NgModule({
  declarations: [],
  providers:[
    {
      provide: TeamAdapter,
      useClass: TeamService
    }
  ],
  imports: [
    CommonModule,
    PlayerInfrastructureModule
  ]
})
export class InfrastructureModule { }
