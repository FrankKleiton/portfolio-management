import { Period } from "../../src/entities/Period";

describe("period", () => {
  let twentyOne: Period;
  let twentyTwo: Period;
  let twentyOneToTwentyFour: Period;

  beforeAll(() => {
    twentyOne = new Period(2021);
    twentyTwo = new Period(2022);
    twentyOneToTwentyFour = new Period(2021, 2024);
  });

  test("year equality", () => {
    expect(twentyOne.equals(twentyOne)).toBeTruthy();
    expect(twentyOne.equals(twentyOne)).toBeTruthy();
    expect(twentyOne.equals(twentyTwo)).toBeFalsy();
    expect(twentyOneToTwentyFour.equals(twentyOne)).toBeFalsy();
    expect(twentyOneToTwentyFour.equals(twentyOneToTwentyFour)).toBeTruthy();
  });

  test("year greater than", () => {
    expect(twentyOne.greaterThen(twentyTwo)).toBeFalsy();
    expect(
      twentyOneToTwentyFour.greaterThen(new Period(2021, 2021))
    ).toBeTruthy();

    expect(
      twentyOneToTwentyFour.greaterThen(new Period(2021, 2025))
    ).toBeFalsy();
    expect(twentyOneToTwentyFour.greaterThen(twentyOne)).toBeFalsy();
  });
});
