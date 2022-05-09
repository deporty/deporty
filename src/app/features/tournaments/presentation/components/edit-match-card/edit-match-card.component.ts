import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITeamModel } from 'src/app/features/teams/models/team.model';

@Component({
  selector: 'app-edit-match-card',
  templateUrl: './edit-match-card.component.html',
  styleUrls: ['./edit-match-card.component.scss'],
})
export class EditMatchCardComponent implements OnInit {
  formGroup: FormGroup;

  @Input() teams!: ITeamModel[];
  _teams!: ITeamModel[];

  teamA!: ITeamModel;
  teamB!: ITeamModel;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditMatchCardComponent>
  ) {
    this.formGroup = new FormGroup({
      teamA: new FormControl(''),
      teamB: new FormControl(''),
      date: new FormControl(''),
      scoreA: new FormControl(null),
      scoreB: new FormControl(null),
    });
  }
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
    } else {
      this._teams = this.teams;
    }
  }
}
