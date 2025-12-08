import { ClassValidatorFields } from "../../domain/validators/class-validator-fields.js";
import { EntityValidationError } from "../../domain/validators/validation.error.js";
import { FieldsErrors } from "../../domain/validators/validator-fields.interface.js";

type Expected =
  | { validator: ClassValidatorFields<any>; data: any }
  | (() => any);

expect.extend({
  containsErrorMessage(expected: any, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }

      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});

function assertContainsErrorsMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(
            received
          )}. Current: ${JSON.stringify(expected)}`,
      };
}

function isValid() {
  return {
    pass: true,
    message: () => `Expected not to contain error message but received none.`,
  };
}
