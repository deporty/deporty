import { IRegisteredTeamsModel } from '@deporty/entities/tournaments';
import { MemberMapper } from '../../teams/infrastructure/member.mapper';
import { TeamMapper } from '../../teams/infrastructure/team.mapper';

export class RegisteredTeamMapper {
  constructor(
    private teamMapper: TeamMapper,
    private memberMapper: MemberMapper
  ) {}
  fromJson(obj: any): IRegisteredTeamsModel {
    return {
      enrollmentDate: obj['enrollment-date'] as Date,
      members: !!obj['members']
        ? (obj['members'] as []).map((x) => {
            return this.memberMapper.fromJson(x);
          })
        : [],
      team: this.teamMapper.fromJson(obj['team']),
    };
  }

  toJson(registeredTeam: IRegisteredTeamsModel) {
    const registeredTeamTemp = {
      'enrollment-date': registeredTeam.enrollmentDate,
      members: !!registeredTeam.members
        ? registeredTeam.members.map((x) => {
            return this.memberMapper.toReferenceJson(x);
          })
        : [],
      team: this.teamMapper.toReferenceJson(registeredTeam.team),
    };
    return registeredTeamTemp;
  }
}
