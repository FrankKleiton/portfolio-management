import { CashFlow } from "./cash-flow";
import { Company } from "./company";

/**
 * TODO
 * - Companies (Kepler Weber, Taurus) have Cash Flow Statement for each year
 * - Free Cash Flow = Operational Cash Flow - Investing Cash Flow
 * - I need the average Free Cash Flow
 * - I need the Free Cash Flow CAGR
 * - Companies (Kepler Weber, Taurus) have Balance Sheet Statement for each year
 * - Book Value = Current Assets + Non-Current Assets - Current Liabilities - Non-Current Liabilities
 * - CAGR = (End Value / Initial Value)^(1/time) - 1
 * - I need the Book Value CAGR
 */
describe("Company", () => {
  let company: Company;

  beforeAll(() => {
    company = new Company("Kepler Weber");
  });

  test("can get name", () => {
    expect(company.name).toBe("Kepler Weber");
  });

  test("can add cash flow", () => {
    const company = new Company("Kepler Weber");

    for (let year = 2021; year < 2023; year++) {
      const cashFlow = new CashFlow();
      cashFlow.operational = 2000;
      cashFlow.investing = 1000;

      company.addCashFlow(year, cashFlow);

      expect(company.getCashFlow(year)).toEqual(cashFlow);
    }
  });
});

describe("CashFlow", () => {
  let cashFlow: CashFlow;

  beforeAll(() => {
    cashFlow = new CashFlow();
    cashFlow.operational = 2000;
    cashFlow.investing = 1000;
  });

  test("can add operational and investing cash flow", () => {
    expect(cashFlow.operational).toBe(2000);
    expect(cashFlow.investing).toBe(1000);
  });

  test("free cash flow equals operational minus investing", () => {
    expect(cashFlow.freeCashFlow).toBe(1000);
  });
});
