import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITeamModel } from 'src/app/features/teams/models/team.model';

@Component({
  selector: 'app-add-team-card',
  templateUrl: './add-team-card.component.html',
  styleUrls: ['./add-team-card.component.scss'],
})
export class AddTeamCardComponent implements OnInit, OnDestroy {
  formControl: FormControl;
  selectedTeams: any;

  @Input() teams!: ITeamModel[];
  @Input() showButton = true;


  _teams!: ITeamModel[];

  @Output() onSelectTeam: EventEmitter<ITeamModel[]>;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTeamCardComponent>
  ) {
    this.formControl = new FormControl();
    this.selectedTeams = [];
    this.onSelectTeam = new EventEmitter()
  }
  ngOnDestroy(): void {}

  optionSelected(team: ITeamModel) {
    const index = this.selectedTeams.indexOf(team);
    if (index >= 0) {
      this.selectedTeams.splice(index, 1);
    } else {
      this.selectedTeams.push(team);
    }
    this.onSelectTeam.emit(this.selectedTeams)
  }
  remove(player: ITeamModel) {
    const index = this.selectedTeams.indexOf(player);
    if (index >= 0) {
      this.selectedTeams.splice(index, 1);
      this.onSelectTeam.emit(this.selectedTeams)
    }
  }

  sendData() {
    this.dialogRef.close(this.selectedTeams);
  }
  ngOnInit(): void {
    if (this.data) {
      this._teams = this.data.teams;
    } else {
      this._teams = this.teams;
    }
  }
}
