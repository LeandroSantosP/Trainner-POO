import { BubbleSort } from "../src/BubbleSort";

test("BubbleSort asc", function () {
  var arr = [234, 43, 55, 63, 5, 6, 235, 547];
  const bubbleSort = new BubbleSort(arr);

  const orderArr = bubbleSort.sort("asc");

  expect(orderArr).toEqual([5, 6, 43, 55, 63, 234, 235, 547]);
});

test("BubbleSort desc", function () {
  var arr = [234, 43, 55, 63, 5, 6, 235, 547];
  const bubbleSort = new BubbleSort(arr);

  const orderArr = bubbleSort.sort("desc");

  expect(orderArr).toEqual([547, 235, 234, 63, 55, 43, 6, 5]);
});
