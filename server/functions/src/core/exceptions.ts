export class EmptyStringException extends Error {
    constructor(property: string) {
      super();
      this.message = `The ${property} is empty.`;
      this.name = "EmptyStringException";
    }
  }

  export class VariableNotDefinedException extends Error {
    constructor(property: string) {
      super();
      this.message = `The ${property} is not defined.`;
      this.name = "VariableNotDefinedException";
    }
  }
