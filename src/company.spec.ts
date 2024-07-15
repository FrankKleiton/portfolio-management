import { Accounting } from "./accounting";
import { CashFlow } from "./cash-flow";
import { Company } from "./company";

/**
 * TODO
 * - [v] Companies (Kepler Weber, Taurus) have Cash Flow Statement for each year
 * - [v] Free Cash Flow = Operational Cash Flow - Investing Cash Flow
 * - [v] I need the average Free Cash Flow
 * - [x] I need the Free Cash Flow CAGR
 * - [x] Companies (Kepler Weber, Taurus) have Balance Sheet Statement for each year
 * - [x] Book Value = Current Assets + Non-Current Assets - Current Liabilities - Non-Current Liabilities
 * - [x] CAGR = (End Value / Initial Value)^(1/time) - 1
 * - [x] I need the Book Value CAGR
 */
describe("Company", () => {
  let company: Company;

  beforeEach(() => {
    company = new Company("Company");
  });

  test("can get name", () => {
    expect(company.name).toBe("Company");
  });

  test("can insert and retrieve cashflows", () => {
    for (let i = 1; i <= 3; i++) {
      company.addCashFlow(new CashFlow(i, i, i));
    }

    expect(company.cashFlows).toHaveLength(3);
  });

  test("adding cashflow to a year overrides existent one", () => {
    company.addCashFlow(new CashFlow(2000, 1000, 2021));
    company.addCashFlow(new CashFlow(3000, 1000, 2021));

    expect(company.cashFlows).toHaveLength(1);
    expect(
      company.cashFlows[0].equals(new CashFlow(3000, 1000, 2021))
    ).toBeTruthy();
  });
});

describe("Accounting", () => {
  test("calculate average free cash flow", () => {
    const company = new Company("Company");

    company.addCashFlow(new CashFlow(1000, 500, 2021));
    company.addCashFlow(new CashFlow(2000, 1000, 2022));

    const accounting = new Accounting();

    const cashFlow = accounting.averageCashFlow(company);

    expect(cashFlow.equals(new CashFlow(1500, 750))).toBeTruthy();
  });
});

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
