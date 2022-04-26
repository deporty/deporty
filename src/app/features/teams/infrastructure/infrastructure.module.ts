import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamAdapter } from '../adapters/team.adapter';
import { TeamService } from './team/team.service';
import { TeamMapper } from './team/team.mapper';



@NgModule({
  declarations: [],
  providers:[
    TeamMapper,
    {
      provide: TeamAdapter,
      useClass: TeamService
    }
  ],
  imports: [
    CommonModule
  ]
})
export class InfrastructureModule { }
