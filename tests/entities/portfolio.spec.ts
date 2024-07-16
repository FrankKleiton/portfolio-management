import { AverageCashFlow } from "../../src/entities/average-cash-flow";
import { CashFlow } from "../../src/entities/cash-flow";
import { Company } from "../../src/entities/company";
import { Portfolio } from "../../src/entities/portfolio";

describe("Portfolio", () => {
  let company: Company;
  let portfolio: Portfolio;

  beforeEach(() => {
    company = new Company("Company", 100);
    portfolio = new Portfolio();
    company.cashFlows.add(new CashFlow(1000, 500, 2021));
    company.cashFlows.add(new CashFlow(2000, 1000, 2022));
  });

  test("can add company", () => {
    portfolio.addCompany(company);
    portfolio.addCompany(company);
    expect(portfolio.companies).toHaveLength(1);
  });

  test("calculate average cash flow", () => {
    portfolio.buildAverageCashFlow(company);

    const average = company.cashFlows.averageCashFlow();
    expect(average?.equals(new AverageCashFlow(1500, 750))).toBeTruthy();
  });

  test("calculate average cash flow a second time should override first one", () => {
    portfolio.buildAverageCashFlow(company);

    company.cashFlows.add(new CashFlow(3000, 1500, 2023));

    portfolio.buildAverageCashFlow(company);

    const average = company.cashFlows.averageCashFlow();
    expect(average?.equals(new AverageCashFlow(2000, 1000))).toBeTruthy();
  });
});
