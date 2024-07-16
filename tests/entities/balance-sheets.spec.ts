import { BalanceSheet } from "../../src/entities/balance-sheet";
import { BalanceSheets } from "../../src/entities/balance-sheets";

describe("BalanceSheets", () => {
  let balanceSheets: BalanceSheets;

  beforeEach(() => {
    balanceSheets = new BalanceSheets();
  });

  test("can insert and retrieve balance sheets", () => {
    for (let i = 1; i <= 3; i++) {
      balanceSheets.add(new BalanceSheet(i, i, i, i, i));
    }

    expect(balanceSheets.toList()).toHaveLength(3);
  });

  test("adding balancesheet to a year overrides existent one", () => {
    const balanceSheet2 = new BalanceSheet(3000, 1000, 3000, 1000, 2021);
    balanceSheets.add(new BalanceSheet(2000, 1000, 2000, 1000, 2021));
    balanceSheets.add(balanceSheet2);

    expect(balanceSheets.toList()).toHaveLength(1);
    expect(balanceSheets.toList()[0].equals(balanceSheet2)).toBeTruthy();
  });
});
