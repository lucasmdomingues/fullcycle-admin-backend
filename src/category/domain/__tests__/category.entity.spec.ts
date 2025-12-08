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

    test("should change description", () => {
      const category = new Category({
        name: "Movie",
        description: "some description",
      });

      category.changeDescription("new description");
      expect(category.description).toBe("new description");
      expect(validateSpy).toHaveBeenCalled();
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
});

describe("Category Validator", () => {
  describe("create command", () => {
    test("should throw ValidationEntityError when name is empty", () => {
      expect(() => Category.create({ name: "" })).toThrow(EntityValidationError);
    });
  });
});
