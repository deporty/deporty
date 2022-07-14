import { TeamMapper } from '../../teams/infrastructure/team.mapper';
import { IRegisteredTeamsModel } from '@deporty/entities/tournaments';
import { PlayerMapper } from '../../players/infrastructure/player.mapper';

export class RegisteredTeamMapper {
  constructor(
    private teamMapper: TeamMapper,
    private playerMapper: PlayerMapper
  ) {}
  fromJson(obj: any): IRegisteredTeamsModel {
    return {
      enrollmentDate: new Date(obj['enrollment-date'].seconds * 1000),
      members: !!obj['members']
        ? (obj['members'] as []).map((x) => this.playerMapper.fromJson(x))
        : [],
      team: this.teamMapper.fromJson(obj['team']),
    };
  }

  toJson(registeredTeam: IRegisteredTeamsModel) {
    return {
      'enrollment-date': (registeredTeam.enrollmentDate as Date).toTimeString(),
      members: !!registeredTeam.members
        ? (registeredTeam.members as []).map((x) =>
            this.playerMapper.toFullJson(x)
          )
        : [],
      team: this.teamMapper.toWeakJson(registeredTeam.team),
    };
  }
}
