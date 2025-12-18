import { SearchParams } from "../search-params.js";

describe("SearchParams", () => {
  const arrange = [
    { page: null, expectedPage: 1 },
    { page: undefined, expectedPage: 1 },
    { page: "", expectedPage: 1 },
    { page: "0", expectedPage: 1 },
    { page: "-1", expectedPage: 1 },
    { page: "5", expectedPage: 5 },
    { page: "a", expectedPage: 1 },
  ];

  test.each(arrange)(
    "when page is $page, then expectedPage is $expectedPage",
    (item) => {
      expect(new SearchParams({ page: item.page as any }).page).toBe(
        item.expectedPage
      );
    }
  );
});
