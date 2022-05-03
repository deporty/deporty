import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsecasesModule } from '../../usecases/usecases.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { ComponentsModule } from '../components/components.module';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { ComponentsModule as TeamsComponentsModule } from '../../../teams/presentation/components/components.module';
import { CurrentTournamentComponent } from './current-tournament/current-tournament.component';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS = [
  TournamentListComponent,
  TournamentDetailComponent,
  CurrentTournamentComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    ComponentsModule,
    UsecasesModule,
    TeamsComponentsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule
  ],
})
export class PagesModule {}
