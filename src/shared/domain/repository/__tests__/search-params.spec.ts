import { SearchParams } from "../search-params.js";

describe("SearchParams", () => {
  it("should run tests for SearchParams", () => {
    const arrange = [
      { page: null, expectedPage: 1 },
      { page: undefined, expectedPage: 1 },
      { page: "", expectedPage: 1 },
      { page: "0", expectedPage: 1 },
      { page: "-1", expectedPage: 1 },
      { page: "5", expectedPage: 5 },
      { page: "a", expectedPage: 1 },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ page: i.page as any }).page).toBe(
        i.expectedPage
      );
    });
  });
});
