import { ValueObject } from "../value-object.js";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplaxStringValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("Value Object Unit Tests", () => {
  test("should be equals", () => {
    const vo1 = new StringValueObject("test");
    const vo2 = new StringValueObject("test");

    expect(vo1.equals(vo2)).toBe(true);

    const cvo1 = new ComplaxStringValueObject("test", 123);
    const cvo2 = new ComplaxStringValueObject("test", 123);

    expect(cvo1.equals(cvo2)).toBe(true);
  });

  test("should not be equal", () => {   
    const vo1 = new StringValueObject("test");
    const vo2 = new StringValueObject("different value");

    expect(vo1.equals(vo2)).toBe(false);
    expect(vo1.equals(null as any)).toBe(false);
    expect(vo1.equals(undefined as any)).toBe(false);

    const cvo1 = new ComplaxStringValueObject("test", 123);
    const cvo2 = new ComplaxStringValueObject("test", 456);

    expect(cvo1.equals(cvo2)).toBe(false);
    expect(cvo1.equals(null as any)).toBe(false);
    expect(cvo1.equals(undefined as any)).toBe(false);
  });
});
