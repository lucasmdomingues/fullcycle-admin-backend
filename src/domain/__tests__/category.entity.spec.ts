import { Category } from "../category.entity.js";

describe("Category Unit Tests", () => {
  describe("should create a category using constructor", () => {
    test("should create a category with only name", () => {
      const category = new Category({
        name: "Movie",
      });

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

      expect(category.category_id).toBeDefined();
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("should change category properties", () => {
    test("should change name", () => {
      const category = new Category({
        name: "Movie",
      });

      category.changeName("Documentary")
      expect(category.name).toBe("Documentary");
    });

    test("should change description", () => {
      const category = new Category({
        name: "Movie",
        description: "some description",
      });

      category.changeDescription("new description");
      expect(category.description).toBe("new description");
    });
  });
});
