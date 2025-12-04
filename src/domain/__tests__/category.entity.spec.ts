import { Category } from "../category.entity.js";

describe("Category Unit Tests", () => {
  test("should create a category", () => {
    const category = new Category({ name: "Movie" });
    expect(category).toStrictEqual({
      name: "Movie",
      description: null,
      isActive: true,
      createdAt: expect.any(Date),
    });
  });
});
