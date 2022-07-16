import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule as TeamsComponentsModule } from '../../../teams/presentation/components/components.module';
import { UsecasesModule } from '../../usecases/usecases.module';
import { ComponentsModule } from '../components/components.module';
import { EditMatchComponent } from './edit-match/edit-match.component';
import { CurrentTournamentComponent } from './index-tournament/index-tournament.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import {MatTooltipModule} from '@angular/material/tooltip';

const COMPONENTS = [
  TournamentListComponent,
  TournamentDetailComponent,
  CurrentTournamentComponent,
  EditMatchComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers:[
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
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
    MatExpansionModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTooltipModule

    
  ],
})
export class PagesModule {}
