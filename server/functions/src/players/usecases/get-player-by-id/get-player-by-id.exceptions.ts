export class PlayerDoesNotExistException extends Error {
  constructor(id: string) {
    super();
    this.message = `The player with the id ${id} does not exist.`;
    this.name = 'PlayerDoesNotExistException';
  }
}
