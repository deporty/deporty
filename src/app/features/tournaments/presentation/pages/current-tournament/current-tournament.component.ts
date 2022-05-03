import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITournamentModel } from '../../../models/tournament.model';
import { GetCurrentTournamentUsecase } from '../../../usecases/get-current-tournament/get-current-tournament';
import { TournamentListComponent } from '../tournament-list/tournament-list.component';

@Component({
  selector: 'app-current-tournament',
  templateUrl: './current-tournament.component.html',
  styleUrls: ['./current-tournament.component.scss'],
})
export class CurrentTournamentComponent implements OnInit {
  static route = 'current-tournament';
  tournament!: ITournamentModel;
  $tournament!: Observable<ITournamentModel | null>;
  $tournamentSubscription!: Subscription;

  constructor(
    private getCurrentTournamentUsecase: GetCurrentTournamentUsecase,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$tournament = this.getCurrentTournamentUsecase.call('marchagas');
    this.$tournamentSubscription = this.$tournament.subscribe((data) => {
      if (data) {
        this.tournament = data;
      }
    });
  }

  seeTournaments() {
    this.router.navigate([TournamentListComponent.route], {
      relativeTo: this.activatedRoute,
    });
  }
}
