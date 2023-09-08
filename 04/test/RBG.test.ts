import { Rgb } from "../src/RGB";

test("Rgb", function () {
  const rgb = new Rgb(10, 150, 200);
  const blue = rgb.getColorCode("blue");
  console.log(blue);
});
