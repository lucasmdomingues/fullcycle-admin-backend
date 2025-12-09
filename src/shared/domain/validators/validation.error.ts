import { FieldsErrors } from "./validator-fields.interface.js";

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super("Entity Validation Error");
    this.name = "EntityValidationError";
  }

  count(): number {
    return Object.keys(this.error).length;
  }
}
