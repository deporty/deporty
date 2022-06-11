import { formatDate } from '@angular/common';
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { IMatchModel } from '../../../models/match.model';

@Component({
  selector: 'app-edit-match-card',
  templateUrl: './edit-match-card.component.html',
  styleUrls: ['./edit-match-card.component.scss'],
})
export class EditMatchCardComponent implements OnInit {
  formGroup!: FormGroup;

  @Input() teams!: ITeamModel[];
  @Input() match!: IMatchModel;

  _match!: IMatchModel;
  _teams!: ITeamModel[];

  teamA!: ITeamModel;
  teamB!: ITeamModel;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditMatchCardComponent>
  ) {}
  optionSelected(key: string, team: ITeamModel) {
    if (key == 'teamB') {
      this.teamB = team;
    } else {
      this.teamA = team;
    }
  }

  save() {
    const value = this.formGroup.value;
    value['teamB'] = this.teamB;
    value['teamA'] = this.teamA;
    const isValid = this.formGroup.valid;
    if (isValid) {
      this.dialogRef.close(value);
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this._teams = this.data.teams;
      this._match = this.data.match;
    } else {
      this._teams = this.teams;
      this._match = this.match;
    }
    console.log(this._teams)

    const teamA = this._match?.teamA.name || '';
    if (teamA) {
      this.optionSelected('teamA', this._match.teamA);
    }

    const teamB = this._match?.teamB.name || '';
    if (teamB) {
      this.optionSelected('teamB', this._match.teamB);
    }
    console.log(this._match);
    this.formGroup = new FormGroup({
      teamA: new FormControl(teamA),
      teamB: new FormControl(teamB),
      date: new FormControl(this._match?.date ? formatDate(this._match.date, 'yyyy-MM-dd', 'en') : ''),
      scoreA: new FormControl(this._match?.score?.teamA || null),
      scoreB: new FormControl(this._match?.score?.teamB || null),
    });
  }
}
