import { EntityValidationError } from "../../../shared/domain/validators/validation.error.js";
import { UUID } from "../../../shared/domain/value-objects/uuid.vo.js";
import { Category } from "../category.entity.js";

describe("Category Unit Tests", () => {
  let validateSpy: jest.SpyInstance;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

  describe("should create a category using constructor", () => {
    test("should create a category with only name", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.category_id).toBeDefined();
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with name and description", () => {
      const category = new Category({
        name: "Movie",
        description: "some description",
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("some description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with name and is_active false", () => {
      const category = new Category({
        name: "Movie",
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with all properties", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Movie",
        description: "some description",
        is_active: false,
        created_at,
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("some description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });
  });

  describe("should create a category using factory method", () => {
    test("should create a category with only name", () => {
      const category = Category.create({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalled();
    });

    test("should throw ValidationEntityError when creating with invalid name", () => {
      expect(() => Category.create({ name: "" })).containsErrorMessage({
        name: ["name should not be empty"],
      });
    });

    test("should create a category with description and is_active", () => {
      const category = Category.create({
        name: "Movie",
        description: "some description",
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("some description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalled();
    });
  });

  describe("should change category properties", () => {
    test("should change name", () => {
      const category = new Category({
        name: "Movie",
      });

      category.changeName("Documentary");
      expect(category.name).toBe("Documentary");
      expect(validateSpy).toHaveBeenCalled();
    });

    test("should throw ValidationEntityError when changing name to empty", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(() => category.changeName("")).containsErrorMessage({
        name: ["name should not be empty"],
      });
    });

    test("should throw ValidationEntityError when changing name to less than 3 characters", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(() => category.changeName("ab")).containsErrorMessage({
        name: ["name must be longer than or equal to 3 characters"],
      });
    });

    test("should change description", () => {
      const category = new Category({
        name: "Movie",
        description: "some description",
      });

      category.changeDescription("new description");
      expect(category.description).toBe("new description");
      expect(validateSpy).toHaveBeenCalled();
    });

    test("should change description to null", () => {
      const category = new Category({
        name: "Movie",
        description: "some description",
      });

      category.changeDescription(null);
      expect(category.description).toBeNull();
      expect(validateSpy).toHaveBeenCalled();
    });
  });

  describe("should activate and deactivate a category", () => {
    test("should activate a category", () => {
      const category = new Category({
        name: "Movie",
        is_active: false,
      });

      category.activate();
      expect(category.is_active).toBeTruthy();
    });

    test("should deactivate a category", () => {
      const category = new Category({
        name: "Movie",
        is_active: true,
      });

      category.deactivate();
      expect(category.is_active).toBeFalsy();
    });
  });

  describe("category id field", () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new UUID() }];

    test.each(arrange)("when id is %j", ({ id }) => {
      const category = new Category({
        category_id: id as UUID,
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      if (id) {
        expect(category.category_id).toBe(id);
      }
    });
  });

  describe("entity_id getter", () => {
    test("should return category_id as entity_id", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(category.entity_id).toBe(category.category_id);
    });
  });

  describe("toJSON method", () => {
    test("should return all category properties as JSON", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Movie",
        description: "some description",
        is_active: true,
        created_at,
      });

      const json = category.toJSON();

      expect(json).toEqual({
        category_id: category.category_id,
        name: "Movie",
        description: "some description",
        is_active: true,
        created_at,
      });
    });
  });
});

describe("Category Validator", () => {
  describe("create command", () => {
    test("should throw ValidationEntityError when name is empty", () => {
      expect(() => new Category({ name: "" })).containsErrorMessage({
        name: ["name should not be empty"],
      });
    });

    test("should throw ValidationEntityError when name is less than 3 characters", () => {
      expect(() => new Category({ name: "ab" })).containsErrorMessage({
        name: ["name must be longer than or equal to 3 characters"],
      });
    });

    test("should throw ValidationEntityError when name is more than 255 characters", () => {
      const longName = "a".repeat(256);
      expect(() => new Category({ name: longName })).containsErrorMessage({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("should throw ValidationEntityError when name is empty and too long", () => {
      const longName = "a".repeat(256);
      expect(() => new Category({ name: longName })).containsErrorMessage({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("should not throw ValidationEntityError when name is valid", () => {
      expect(() => new Category({ name: "Valid Name" })).not.toThrow();
    });

    test("should not throw ValidationEntityError when description is empty string", () => {
      expect(() => new Category({ name: "Valid Name", description: "" })).not.toThrow();
    });

    test("should not throw ValidationEntityError when description is null", () => {
      expect(() => new Category({ name: "Valid Name", description: null })).not.toThrow();
    });

    test("should not throw ValidationEntityError when is_active is true", () => {
      expect(() => new Category({ name: "Valid Name", is_active: true })).not.toThrow();
    });

    test("should not throw ValidationEntityError when is_active is false", () => {
      expect(() => new Category({ name: "Valid Name", is_active: false })).not.toThrow();
    });
  });
});
