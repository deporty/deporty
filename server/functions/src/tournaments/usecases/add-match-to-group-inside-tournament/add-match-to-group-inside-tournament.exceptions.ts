import { IMatchModel } from "@deporty/entities/tournaments";

export class MatchWasAlreadyRegistered extends Error {
    constructor(match: IMatchModel) {
      super();
      this.message = `The match with "${match.teamA.name}" and "${match.teamB.name}" was already registered`;
      this.name = 'MatchWasAlreadyRegistered';
    }
  }
  
  export class StageDoesNotExist extends Error {
    constructor(stageIndex: string) {
      super();
      this.message = `The stage with the id "${stageIndex}" does not exist`;
      this.name = 'StageDoesNotExist';
    }
  }
  

  export class GroupDoesNotExist extends Error {
    constructor(groupIndex: number) {
      super();
      this.message = `The group with the index "${groupIndex}" does not exist.`;
      this.name = 'GroupDoesNotExist';
    }
  }
  