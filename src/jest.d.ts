import { FieldsErrors } from "./validator-fields.interface.js";

declare global {
  namespace jest {
    interface Matchers<R> {
        containsErrorMessage: (expected: FieldsErrors) => R;
    }
  }
}
