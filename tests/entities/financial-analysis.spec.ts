import { CashFlow } from "../../src/entities/cash-flow";
import { Company } from "../../src/entities/company";
import { FinancialAnalysis } from "../../src/entities/financial-analysis";
import { Portfolio } from "../../src/entities/portfolio";

describe("Financial analysis", () => {
  let company: Company;
  let portfolio: Portfolio;

  beforeEach(() => {
    company = new Company("Company", 100);
    portfolio = new Portfolio();
  });

  test("can get the free cash flow yield", () => {
    company.cashFlows.add(new CashFlow(20, 10, 2021));

    portfolio.buildFinancialAnalysis(company);

    const ratio = company.financialAnalyses.all().at(0);

    expect(ratio?.equals(new FinancialAnalysis(2021, 10))).toBeTruthy();
    expect(ratio?.sameYear(new FinancialAnalysis(2021))).toBeTruthy();
  });
});
