import { Component, Input, OnInit } from '@angular/core';
import { ITournamentModel } from '@deporty/entities/tournaments';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'src/app/init-app';


@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss'],
})
export class TournamentCardComponent implements OnInit {
  @Input() tournament!: ITournamentModel;
  img!: string;
  constructor() {}

  ngOnInit(): void {
    if (this.tournament.flayer) {
      const flayerRef = ref(storage, this.tournament.flayer);

      getDownloadURL(flayerRef).then((data) => {
        this.img = data;
      });
    }
  }
}
