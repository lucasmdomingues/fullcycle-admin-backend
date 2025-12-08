import { UUID, UUIDInvalidError } from "../uuid.vo.js";

describe("UUID Unit Tests", () => {
  const validateSpy = jest.spyOn(UUID.prototype, "validate" as any);

  test("should throw an error when UUID is invalid", () => {
    expect(() => new UUID("invalid-uuid")).toThrow(UUIDInvalidError);
  });

  test("should create a uuid", () => {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";
    const uuid = new UUID(validUuid);
    expect(uuid.id).toBeDefined();
    expect(validateSpy).toHaveBeenCalled();
  });

  test("should accept a valid UUID", () => {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";
    const uuid = new UUID(validUuid);
    expect(uuid.id).toBe(validUuid);
    expect(validateSpy).toHaveBeenCalled();
  });
});
