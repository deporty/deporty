import { Component, OnInit } from '@angular/core';
import { logEvent } from 'firebase/analytics';
import { IPlayerModel } from 'src/app/features/players/models/player.model';
import { analytics } from 'src/app/init-app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  static route = 'team';
  selectedMember: any;

  team = {
    'technical stuff': {},
    players: [
      {
        name: 'Simón Osorio Castaño',
        number: 1,
        role: 'Arquero',
        alias: 'Caco',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/default-pictures%2Fdefault-player-profile.png?alt=media&token=fa007b78-7fc5-41cd-a14a-cae5c7d9fd88',
      },
      {
        name: 'Manuel Alejandro Zuluaga',
        number: 5,
        role: 'Mediocampista',
        alias: 'Zulu',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/default-pictures%2Fdefault-player-profile.png?alt=media&token=fa007b78-7fc5-41cd-a14a-cae5c7d9fd88',
      },

      {
        name: 'Camilo Andrés Loaiza Cardozo',
        number: 6,
        role: 'Mediocampista',
        alias: 'calo',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/default-pictures%2Fdefault-player-profile.png?alt=media&token=fa007b78-7fc5-41cd-a14a-cae5c7d9fd88',
      },
      {
        name: 'Santiago Loaiza Giraldo',
        number: 7,
        role: 'Mediocampista',
        alias: 'Mono',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/players%2F1053857232%2Fprofile.jpeg?alt=media&token=8be34560-5c15-4f5c-9721-544b82e24b16',
      },

      {
        name: 'Sebastián Santamaría Linares',
        number: 9,
        role: 'Delantero Centro ',
        alias: 'Rolo',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/default-pictures%2Fdefault-player-profile.png?alt=media&token=fa007b78-7fc5-41cd-a14a-cae5c7d9fd88',
      },
      {
        name: 'Juan Manuel Valencia López',
        number: 10,
        role: 'Lateral Izquierdo',
        alias: 'Juanma',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/default-pictures%2Fdefault-player-profile.png?alt=media&token=fa007b78-7fc5-41cd-a14a-cae5c7d9fd88',
      },
      {
        name: 'Santiago Rodríguez Ospina',
        number: 12,
        role: 'Defensa',
        alias: 'Chokis',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/players%2F1060655572%2Fprofile.jpeg?alt=media&token=49e765f3-862a-44cb-aaa1-81af17e96ba6',
      },
      {
        name: 'Sergio Posada Urrea',
        number: 14,
        role: 'Extremo Derecho',
        alias: 'Pocho',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/players%2F1053850428%2Fprofile.jpeg?alt=media&token=84e6b85e-a059-4eec-b9c0-0a41e070f17e',
      },
      {
        name: 'Juan Felipe Ospina',
        number: 17,
        role: 'Volante',
        alias: 'Pildo',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/default-pictures%2Fdefault-player-profile.png?alt=media&token=fa007b78-7fc5-41cd-a14a-cae5c7d9fd88',
      },
      {
        name: 'Juan Camilo Morales Sánchez',
        number: 29,
        role: 'Mediocampista Defensivo ',
        alias: 'Mora',
        image: 'https://firebasestorage.googleapis.com/v0/b/deporty-app.appspot.com/o/default-pictures%2Fdefault-player-profile.png?alt=media&token=fa007b78-7fc5-41cd-a14a-cae5c7d9fd88',
      },
    ] as IPlayerModel[],
  };
  constructor() {}

  ngOnInit(): void {
    if (environment.analytics) {
      logEvent(analytics, 'team');
    }
  }
}
