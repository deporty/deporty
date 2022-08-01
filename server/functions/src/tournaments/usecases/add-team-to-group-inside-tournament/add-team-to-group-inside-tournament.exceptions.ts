export class TeamIsAlreadyInTheGroup extends Error {
  constructor(name: string) {
    super();
    this.message = `The team "${name}" is already in the group`;
    this.name = 'TeamIsAlreadyInTheGroup';
  }
}


export class TeamIsAlreadyInOtherGroup extends Error {
  constructor(name: string) {
    super();
    this.message = `The team "${name}" is already in other group`;
    this.name = 'TeamIsAlreadyInOtherGroup';
  }
}

export class TeamDoesNotHaveMembers extends Error {
  constructor(name: string) {
    super();
    this.message = `The team "${name}" does not have members. Add at least one member.`;
    this.name = 'TeamDoesNotHaveMembers';
  }
}
