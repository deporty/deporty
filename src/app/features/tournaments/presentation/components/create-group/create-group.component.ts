import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { GROUP_LETTERS } from '../components.constants';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  letters: string[];
  selectedTeams: ITeamModel[];
  labelFormControl: FormControl;

  @Input() teams!: ITeamModel[];
  _teams!: ITeamModel[];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateGroupComponent>
  ) {
    this.letters = GROUP_LETTERS;
    this.selectedTeams = [];
    this.labelFormControl = new FormControl('');
  }
  ngOnInit(): void {
    if (this.data) {
      this._teams = this.data.teams;
    } else {
      this._teams = this.teams;
    }
  }

  sendData() {
    const value = {
      teams: this.selectedTeams,
      label: this.labelFormControl.value
    };
    this.dialogRef.close(value);
  }

  onSelectTeam(teams: ITeamModel[]) {
    this.selectedTeams = teams;
  }
  // optionSelected(label: string) {
  //   const index = this.selectedTeams.indexOf(label);
  //   if (index >= 0) {
  //     this.selectedTeams.splice(index, 1);
  //   } else {
  //     this.selectedTeams.push(label);
  //   }
  // }

  onSelectedGroups() {}
}
