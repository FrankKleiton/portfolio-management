import { Period } from "../../src/entities/Period";

describe("period", () => {
  test("plus", () => {
    // descending
    expect(Period.simple(2021).plus(Period.simple(2021))).toEqual(
      Period.simple(2021)
    );
    expect(Period.simple(2021).plus(Period.simple(2022))).toEqual(
      Period.compound(2022, 2021)
    );
    expect(Period.compound(2022, 2021).plus(Period.simple(2023))).toEqual(
      Period.compound(2023, 2021)
    );
    expect(Period.compound(2023, 2021).plus(Period.simple(2022))).toEqual(
      Period.compound(2023, 2021)
    );
    expect(Period.simple(2023).plus(Period.compound(2022, 2021))).toEqual(
      Period.compound(2023, 2021)
    );
    expect(Period.simple(2023).plus(Period.compound(2024, 2021))).toEqual(
      Period.compound(2024, 2021)
    );

    expect(Period.simple(2023).plus(Period.compound(2024, 2021))).toEqual(
      Period.compound(2024, 2021)
    );
  });
});
