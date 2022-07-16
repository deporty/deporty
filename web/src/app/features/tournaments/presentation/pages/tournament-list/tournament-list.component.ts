import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITournamentModel } from '@deporty/entities/tournaments';
import { Observable } from 'rxjs';
import { GetAllSummaryTournamentsUsecase } from '../../../usecases/get-all-summary-tournaments/get-all-summary-tournaments';
import { TournamentDetailComponent } from '../tournament-detail/tournament-detail.component';


@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss'],
})
export class TournamentListComponent implements OnInit {
  static route = 'tournament-list';
  $tournaments!: Observable<ITournamentModel[]>;
  tournaments!: ITournamentModel[];
  constructor(
    private getAllSummaryTournamentsUsecase: GetAllSummaryTournamentsUsecase,
  
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.$tournaments = this.getAllSummaryTournamentsUsecase.call();
    this.$tournaments.subscribe((data: ITournamentModel[]) => {
      this.tournaments = data;
    });
  }

  goToTournamentDetail(id: string) {
    this.router.navigate([TournamentDetailComponent.route], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        id
      }
    });
  }
}
