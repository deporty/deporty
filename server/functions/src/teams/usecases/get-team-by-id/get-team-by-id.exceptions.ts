export class TeamDoesNotExist extends Error {
    constructor(id: string) {
      super();
      this.message = `The team with the id ${id} does not exist`;
      this.name = 'TeamDoesNotExist';
    }
  }
  