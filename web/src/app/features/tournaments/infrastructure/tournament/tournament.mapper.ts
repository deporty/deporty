import { Injectable } from '@angular/core';
import { TeamMapper } from 'src/app/features/teams/infrastructure/team/team.mapper';
import { ITournamentModel } from '@deporty/entities/tournaments';
import { FixtureMapper } from './fixture.mapper';
@Injectable()
export class TournamentMapper {
  constructor(
    private teamMapper: TeamMapper,
    private fixtureMapper: FixtureMapper
  ) {}
  fromJson(obj: any): ITournamentModel {
    return {
      id: obj['id'],
      name: obj['name'],
      flayer: obj['flayer'],
      category: obj['category'],
      reward: obj['reward'],
      status: obj['status'],
      description: obj['description'],
      inscription: obj['inscription'],
      regulation: obj['regulation'],
      startsDate: obj['starts-date'],

      registeredTeams: obj['registered-teams'],
    };
  }
}
