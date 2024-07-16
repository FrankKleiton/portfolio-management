import { BalanceSheet } from "../../src/entities/balance-sheet";

describe("Balance Sheet", () => {
  let balanceSheet: BalanceSheet;

  beforeEach(() => {
    balanceSheet = new BalanceSheet(1000, 2000, 3000, 4000, 2021);
  });

  test("can add year", () => {
    expect(balanceSheet.sameYear(balanceSheet)).toBeTruthy();
  });

  test("can add assets and liabilities", () => {
    expect(balanceSheet.equals(balanceSheet)).toBeTruthy();
  });

  test("total assets equals current asset plus non current asset", () => {
    expect(balanceSheet.totalAssets).toBe(3000);
  });

  test("total liabilities equals current libilities plus non current libilities", () => {
    expect(balanceSheet.totalLiabilities).toBe(7000);
  });

  test("check equality", () => {
    expect(
      balanceSheet.equals(new BalanceSheet(1000, 2000, 3000, 4000, 2021))
    ).toBeTruthy();

    expect(balanceSheet.equals(new BalanceSheet(0, 0, 0, 0, 2021))).toBeFalsy();
  });

  test("book value equals total assets minus total liabilities", () => {
    expect(balanceSheet.bookValue).toBe(-4000);
  });
});
