import { CashFlow } from "../../src/entities/cash-flow";

describe("CashFlow", () => {
  let cashFlow: CashFlow;

  beforeAll(() => {
    cashFlow = new CashFlow(2000, 1000, 2021);
  });

  test("can add year", () => {
    expect(cashFlow.sameYear(new CashFlow(0, 0, 2021))).toBeTruthy();
  });

  test("can add operational and investing cash flow", () => {
    expect(cashFlow.equals(new CashFlow(2000, 1000)));
  });

  test("free cash flow equals operational minus investing", () => {
    expect(cashFlow.freeCashFlow).toBe(1000);
  });

  test("check equality", () => {
    expect(cashFlow.equals(cashFlow)).toBeTruthy();
    expect(cashFlow.equals(new CashFlow(6000, 5000, 2021))).toBeFalsy();
  });

  test("can sum cashflows", () => {
    expect(
      new CashFlow(1000, 1000)
        .plus(new CashFlow(1000, 1000))
        .equals(new CashFlow(2000, 2000))
    ).toBeTruthy();
  });

  test("can divide cashflows", () => {
    expect(
      new CashFlow(1000, 1000).divide(2).equals(new CashFlow(500, 500))
    ).toBeTruthy();
  });
});
