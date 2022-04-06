import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentTournamentComponent } from './ui/pages/current-tournament/current-tournament.component';
import { TournamentListComponent } from './ui/pages/tournament-list/tournament-list.component';
import { CreateTournamentComponent } from './ui/pages/create-tournament/create-tournament.component';
import { EditTournamentComponent } from './ui/pages/edit-tournament/edit-tournament.component';



@NgModule({
  declarations: [
    CurrentTournamentComponent,
    TournamentListComponent,
    CreateTournamentComponent,
    EditTournamentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TournamentsModule { }
