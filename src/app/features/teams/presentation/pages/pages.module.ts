import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { UsecasesModule } from '../../usecases/usecases.module';
import { ComponentsModule } from '../components/components.module';
import { PlayersModule } from "../../../players/players.module";
import { MatDialogModule } from '@angular/material/dialog';

const COMPONENTS =[
  TeamComponent,
  TeamsComponent
]
@NgModule({
  declarations: [...COMPONENTS, ],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    UsecasesModule,
    ComponentsModule,
    PlayersModule,
  ]
})
export class PagesModule { }
