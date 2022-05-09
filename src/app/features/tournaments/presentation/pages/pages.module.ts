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
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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
    CoreModule,
    UsecasesModule,
    TeamsComponentsModule,
    MatButtonModule,

    MatExpansionModule,
    MatIconModule
  ],
})
export class PagesModule {}
