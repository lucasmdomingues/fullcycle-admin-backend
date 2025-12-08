import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ValueObject } from "../value-object.js";

export class UUID extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.id);
    if (!isValid) throw new UUIDInvalidError();
  }
}

export class UUIDInvalidError extends Error {
  constructor() {
    super("ID is not a valid UUID");
    this.name = "UUIDInvalidError";
  }
}
