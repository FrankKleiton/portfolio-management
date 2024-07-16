import { CashFlow } from "../../src/entities/cash-flow";
import { CashFlows } from "../../src/entities/cash-flows";

describe("CashFlows", () => {
  let cashFlows = new CashFlows();

  beforeEach(() => {
    cashFlows = new CashFlows();
  });

  test("can insert and retrieve cashflows", () => {
    for (let i = 1; i <= 3; i++) {
      cashFlows.add(new CashFlow(i, i, i));
    }

    expect(cashFlows.toList()).toHaveLength(3);
  });

  test("adding cashflow to a year overrides existent one", () => {
    const cashFlow2 = new CashFlow(3000, 1000, 2021);
    cashFlows.add(new CashFlow(2000, 1000, 2021));
    cashFlows.add(cashFlow2);

    expect(cashFlows.toList()).toHaveLength(1);
    expect(cashFlows.toList()[0].equals(cashFlow2)).toBeTruthy();
  });
});
