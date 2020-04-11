import { formatDate } from "./functions";

test("formatDate pads tricky dates with 0's correctly", () => {
  let testDate = new Date("January 1, 2020, 08:05:00");
  expect(formatDate(testDate)).toEqual("1/1/2020 - 08:05");
});
