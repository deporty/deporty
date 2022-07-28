import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCardComponent } from './tournament-card/tournament-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GroupCardComponent } from './group-card/group-card.component';
import { MatchCardComponent } from './match-card/match-card.component';
import { MatchSummaryCardComponent } from './match-summary-card/match-summary-card.component';
import { TeamSummaryCardComponent } from './team-summary-card/team-summary-card.component';
import { MatListModule } from '@angular/material/list';
import { PositionTableCardComponent } from './position-table-card/position-table-card.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { AddTeamCardComponent } from './add-team-card/add-team-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UsecasesModule as TeamsUsecasesModule } from '../../../teams/usecases/usecases.module';
import { EditMatchCardComponent } from './edit-match-card/edit-match-card.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComponentsModule as PlayerComponentsModule } from '../../../players/presentation/components/components.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CardFormComponent } from './card-form/card-form.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const COMPONENTS = [
  TournamentCardComponent,
  GroupCardComponent,
  MatchCardComponent,
  MatchSummaryCardComponent,
  TeamSummaryCardComponent,
  PositionTableCardComponent,
  AddTeamCardComponent,
  EditMatchCardComponent,
  CreateGroupComponent,
  PlayerFormComponent,
];

@NgModule({
  declarations: [...COMPONENTS, CardFormComponent],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    ReactiveFormsModule,
    TeamsUsecasesModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    CoreModule,
    MatExpansionModule,
    PlayerComponentsModule,
    MatCheckboxModule,
    MatSelectModule

  ],
})
export class ComponentsModule {}
