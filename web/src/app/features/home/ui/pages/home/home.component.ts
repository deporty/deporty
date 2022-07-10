import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import defaultNew from '../../../../news/infrastructure/default-new';
import {
  getCurrentGeolocation,
  trackEvent,
} from 'src/app/core/helpers/log-events.helper';
import { PlayersRoutingModule } from 'src/app/features/players/players-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  static route = 'index';

  defaultNew = defaultNew;
  modules = [
    {
      name: 'Jugadores',
      description:
        'Encuentre toda la información de los jugadores que han participado o no en los torneos realizados.',
      img: 'assets/player-preview.jpg',
      route: PlayersRoutingModule.route,
    },

    {
      name: 'Equipos',
      description:
        'Aquí podrá crear, editar y ver equipos, al igual que sus integrantes y demás información.',
      img: 'assets/teams-preview.jpg',
      route: 'teams',
    },

    {
      name: 'Torneos',
      description:
        'Aquí podrá crear, editar y ver equipos, al igual que sus integrantes y demás información.',
      img: 'assets/tournament-preview.jpg',
      route: 'tournaments',
    },
  ];
  constructor(private router: Router) {}

  goModule(route: string) {
    this.router.navigate([route]);
  }
  ngOnInit(): void {
    getCurrentGeolocation().subscribe((data) => {
      trackEvent('index_views', data);
    });
  }
}
