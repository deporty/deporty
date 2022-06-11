export class PlayerAlreadyExistsException extends Error {
  constructor(document: string) {
    super();
    this.message = `The player's ${document} already exists.`;
    this.name = "PlayerAlreadyExistsException";
  }
}
