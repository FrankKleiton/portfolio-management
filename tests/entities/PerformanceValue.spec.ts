import { PerformanceValue } from "../../src/entities/PerformanceValue";
import { Period } from "../../src/entities/Period";

describe("PerformanceValue", () => {
  test("sum", () => {
    expect(
      new PerformanceValue(1000, Period.simple(2021)).plus(
        new PerformanceValue(-100, Period.simple(2021))
      )
    ).toEqual(new PerformanceValue(900, Period.simple(2021)));
  });
});
