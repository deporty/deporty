import { Component, OnInit } from '@angular/core';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import {
  CreateFixtureUsecase,
  IFixtureConfig,
} from '../../../usecases/create-fixture/create-fixture';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss'],
})
export class CreateTournamentComponent implements OnInit {
  static route = 'create-tournament';
  constructor(private createFixtureUsecase: CreateFixtureUsecase) {}

  ngOnInit(): void {
    const teams: ITeamModel[] = [];
    for (let i = 0; i < 6; i++) {
      teams.push({
        name: 'E' + i,
        id: ''+i
      });
    }
    const config: IFixtureConfig = {
      teams,
      fixtureSteps: [
        {
          groups: 4,
          passPerGroup: 8,
        },
        {
          groups: 4,
          passPerGroup: 2,
        },
      ],
    };

    const response = this.createFixtureUsecase.call(config);
    console.log(response);
  }
}
