import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUsecase } from 'src/app/core/usecases/base.usecase';
import { ITeamModel } from 'src/app/features/teams/models/team.model';
import { IFixtureModel } from '../../models/fixture.model';

export interface IFixtureConfig {
  fixtureSteps: {
    groups: number;
    passPerGroup: number;
  }[];
  teams: ITeamModel[];
}

@Injectable()
export class CreateFixtureUsecase extends BaseUsecase<
  IFixtureConfig,
  IFixtureModel
> {
  private getAmmountTeamByGroup(
    teams: ITeamModel[],
    groupsNumber: number
  ): ITeamModel[][] {
    const baseMembers = Math.trunc(teams.length / groupsNumber);

    const extraMembers = teams.length % groupsNumber;
    const response = [];
    let j = extraMembers;
    let start = 0;
    let end = 0;
    for (let i = 0; i < groupsNumber; i++) {
      const ammount = baseMembers + (j > 0 ? 1 : 0);
      end = start + ammount;
      response.push(teams.slice(start, end));
      if (j > 0) {
        j--;
      }
      start += ammount;
    }
    return response;
  }
  private splitTeamsIntoGroups(teams: number[], groups: number) {
    for (let i = 0; i < teams.length; i++) {
      const element = teams[i];
    }
  }

  private createMatches(groups: ITeamModel[]) {
    for (let j = 0; j < groups.length; j++) {
      const element = groups[j];
    }
  }
  call(param: IFixtureConfig): Observable<IFixtureModel> {

    // for (const step of param.fixtureSteps) {
    //   const ammountTeamsByGroup = this.getAmmountTeamByGroup(
    //     param.teams,
    //     step.groups
    //   );
    //   console.log(ammountTeamsByGroup);
    // }
    throw new Error('Method not implemented.');
  }
}
