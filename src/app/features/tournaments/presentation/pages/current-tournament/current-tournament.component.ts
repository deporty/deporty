import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  getCurrentGeolocation,
  trackEvent,
} from 'src/app/core/helpers/log-events.helper';
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

  body: any;

  tournament!: ITournamentModel;
  $tournament!: Observable<ITournamentModel | null>;
  $tournamentSubscription!: Subscription;

  constructor(
    private getCurrentTournamentUsecase: GetCurrentTournamentUsecase,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.body = {
      children: [
        {
          component: 'app-header',
          data: {
            title: 'Partido preparatorio o partido clandestino',
            subtitle: '02-02-2022',
          },
          children: [],
        },
        {
          component: 'app-paragraph',
          data: {
            text: `
                  Anoche varios jugadores titulares y suplentes de CUCOS F.C. jugaron un partido en el 
                  centro deportivo Terminal de manizales, con el equipo del capitán Vásquez y su combo. Se comenta
                  que el partido pudo no ser oficial porque su técnico no se encontraba en el banquillo, lo que 
                  genera muchas dudas entre los aficionados.
                  `,
            img: 'assets/general.png',
            'img-position': 'left',
            subtitle: '',
          },
          children: [],
        },

        {
          component: 'app-paragraph',
          data: {
            text: `
                 Se comenta que el jugador titular "Mono" y el jugador suplente "Leche"
                 salieron del partido lesionados; los que compromete su participación en las proximas fechas 
                 oficiales.
                  `,
            'img-position': 'left',
            title: 'Ganaron pero a qué costo',
          },
          children: [],
        },
      ],
    };
  }

  ngOnInit(): void {
    getCurrentGeolocation().subscribe((data) => {
      trackEvent('tournaments_views', {
        date: data.date,
        timestamp: data.timestamp,
      });
    });
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
