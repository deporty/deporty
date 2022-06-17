import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'src/app/init-app';
import { ITeamModel } from '../../../models/team.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  @Input() team!: ITeamModel;
  @Input() options!: string[];
  @Output() selectedOption = new EventEmitter();
  img!: string;
  constructor() {}
  emitSelectedOption(index: number) {
    this.selectedOption.emit({
      index,
      team: this.team,
    });
  }
  ngOnInit(): void {
    if (this.team && this.team.shield) {
      const imageRef = ref(storage, this.team.shield);

      getDownloadURL(imageRef).then((data) => {
        this.img = data;
      });
    }
  }
}
