import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { UsecasesModule } from '../../usecases/usecases.module';
import { ComponentsModule } from '../components/components.module';
import { PlayersModule } from '../../../players/players.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateTeamComponent } from './create-team/create-team.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const COMPONENTS = [TeamComponent, TeamsComponent, CreateTeamComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    UsecasesModule,
    ComponentsModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    PlayersModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
})
export class PagesModule {}
