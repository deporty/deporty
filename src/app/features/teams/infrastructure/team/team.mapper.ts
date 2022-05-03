import { Injectable } from '@angular/core';
import { ITeamModel } from '../../models/team.model';
@Injectable()
export class TeamMapper {
  fromJson(obj: any): ITeamModel {
    return {
      name: obj['name'],
      id: obj['id'],
      athem: obj['athem'],
      members: obj['members'],
      shield: obj['shield'],
      agent: obj['agent'],
    };
  }
}
