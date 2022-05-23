import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsecasesModule } from '../../usecases/usecases.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { ComponentsModule } from '../components/components.module';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { ComponentsModule as TeamsComponentsModule } from '../../../teams/presentation/components/components.module';
import { CurrentTournamentComponent } from './index-tournament/index-tournament.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { EditMatchComponent } from './edit-match/edit-match.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComponentsModule as PlayerComponentsModule } from '../../../players/presentation/components/components.module';
import {MatSelectModule} from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

const COMPONENTS = [
  TournamentListComponent,
  TournamentDetailComponent,
  CurrentTournamentComponent,
  EditMatchComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    ComponentsModule,
    PlayerComponentsModule,
    CoreModule,
    UsecasesModule,
    TeamsComponentsModule,
    MatButtonModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatChipsModule
  ],
})
export class PagesModule {}
