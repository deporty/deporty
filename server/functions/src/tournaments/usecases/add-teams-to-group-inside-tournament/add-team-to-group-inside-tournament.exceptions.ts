export class TeamWasAlreadyRegistered extends Error {
  constructor(name: string) {
    super();
    this.message = `The team "${name}" was already registered`;
    this.name = 'TeamWasAlreadyRegistered';
  }
}

export class TeamDoesNotHaveMembers extends Error {
  constructor(name: string) {
    super();
    this.message = `The team "${name}" does not have members. Add at least one member.`;
    this.name = 'TeamDoesNotHaveMembers';
  }
}
