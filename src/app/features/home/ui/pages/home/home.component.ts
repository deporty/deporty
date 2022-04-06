import { Component, OnInit } from '@angular/core';
import { PlayersRoutingModule } from 'src/app/features/players/players-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  static route = 'index';

  modules = [
    {
      name: 'Jugadores',
      description:
        'Encuentre toda la información de los jugadores que han participado o no en los torneos realizados.',
      img: 'https://firebasestorage.googleapis.com/v0/b/sports-tournament-13ff7.appspot.com/o/general%2Fhome%2Fplayers-module.png?alt=media&token=3fe0d12e-dbf5-426f-8fda-8e242437b87f',
      route: PlayersRoutingModule.route,
    },

    {
      name: 'Equipos',
      description:
        'Aquí podrá crear, editar y ver equipos, al igual que sus integrantes y demás información.',
      img: 'https://firebasestorage.googleapis.com/v0/b/sports-tournament-13ff7.appspot.com/o/general%2Fhome%2Fteams-module.png?alt=media&token=390c6032-aca7-49b8-bd6d-d310e8154cff',
      route: 'players',
    },

    {
      name: 'Torneos',
      description:
        'Aquí podrá crear, editar y ver equipos, al igual que sus integrantes y demás información.',
      img: 'https://firebasestorage.googleapis.com/v0/b/sports-tournament-13ff7.appspot.com/o/general%2Fhome%2Fteams-module.png?alt=media&token=390c6032-aca7-49b8-bd6d-d310e8154cff',
      route: 'players',
    },
  ];
  constructor() {}

  goModule(route: string){

  }
  ngOnInit(): void {}
}
