export class TournamentDoesNotExist extends Error {
    constructor(id: string) {
      super();
      this.message = `The tournament with the id ${id} does not exist`;
      this.name = 'TournamentDoesNotExist';
    }
  }
  