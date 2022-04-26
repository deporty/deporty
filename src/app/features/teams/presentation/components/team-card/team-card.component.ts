import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor() {}
  emitSelectedOption(index: number) {
    this.selectedOption.emit(this.options[index]);
  }
  ngOnInit(): void {}
}
