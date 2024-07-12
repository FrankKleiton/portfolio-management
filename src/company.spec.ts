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
  test("can create company", () => {
    const company = new Company("Kepler Weber");

    expect(company.name).toBe("Kepler Weber");
  });

  test("can add operational cash flow", () => {
    const company = new Company("Kepler Weber");

    company.addOperationalCashFlow(2021, 1000);
    company.addOperationalCashFlow(2022, 1000);

    expect(company.getOperationalCashFlow(2021)).toBe(1000);
    expect(company.getOperationalCashFlow(2022)).toBe(1000);
  });

  test("can add operational cash flow", () => {
    const company = new Company("Kepler Weber");

    company.addOperationalCashFlow(2021, 1000);
    company.addOperationalCashFlow(2022, 1000);

    expect(company.getOperationalCashFlow(2021)).toBe(1000);
    expect(company.getOperationalCashFlow(2022)).toBe(1000);
  });

  test("can add investing cash flow", () => {
    const company = new Company("Kepler Weber");

    company.addInvestingCashFlow(2021, 1000);
    company.addInvestingCashFlow(2022, 1000);

    expect(company.getInvestingCashFlow(2021)).toBe(1000);
    expect(company.getInvestingCashFlow(2022)).toBe(1000);
  });
});
