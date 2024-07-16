import { Portfolio } from "./accounting";
import { BalanceSheet } from "./balance-sheet";
import { CashFlow } from "./cash-flow";
import { Company } from "./company";
import { FinancialRatios } from "./financial-ratios";

/**
 * TODO:
 * - [x] I need the Free Cash Flow CAGR
 * 1. [x] Given just one cash flow, the free cash flow CAGR should be null
 * 2. [x] Given more than one cash flow, the free cash flow cagr should be
 * ((End Value / Initial Value)^(1/time) - 1)
 * - [x] I also need the Book Value CAGR
 * - [x] I need the average balance sheet
 * - [x] calculate the free cash flow yield of each year based on the current
 * market value
 */

/**
 * Future TODO
 * - [x] calculate the cash conversion ratio of each year (operating cash flow ÷ operating profit)
 * - [x] calculate the roce of each year (ebit / (total asset - current liabilities))
 * - [x] We are exposing the free cash flow, the total assets and the total liabilities by
 * getters, chech how make these private and just return it on the right moment, is it okay to have
 * them as getters and setters?
 */
describe("Tests", () => {
  let company: Company;
  let portfolio: Portfolio;

  beforeEach(() => {
    company = new Company("Company", 100);
    portfolio = new Portfolio();
  });

  describe("Company", () => {
    test("can get name", () => {
      expect(company.name).toBe("Company");
    });

    test("can get market value", () => {
      expect(company.marketValue).toBe(100);
    });

    test("can insert and retrieve cashflows", () => {
      for (let i = 1; i <= 3; i++) {
        company.addCashFlow(new CashFlow(i, i, i));
      }

      expect(company.cashFlows).toHaveLength(3);
    });

    test("can insert and retrieve balance sheets", () => {
      for (let i = 1; i <= 3; i++) {
        company.addBalanceSheet(new BalanceSheet(i, i, i, i, i));
      }

      expect(company.balanceSheets).toHaveLength(3);
    });

    test("adding cashflow to a year overrides existent one", () => {
      const balanceSheet2 = new CashFlow(3000, 1000, 2021);
      company.addCashFlow(new CashFlow(2000, 1000, 2021));
      company.addCashFlow(balanceSheet2);

      expect(company.cashFlows).toHaveLength(1);
      expect(company.cashFlows[0].equals(balanceSheet2)).toBeTruthy();
    });

    test("adding balancesheet to a year overrides existent one", () => {
      const balanceSheet2 = new BalanceSheet(3000, 1000, 3000, 1000, 2021);
      company.addBalanceSheet(new BalanceSheet(2000, 1000, 2000, 1000, 2021));
      company.addBalanceSheet(balanceSheet2);

      expect(company.balanceSheets).toHaveLength(1);
      expect(company.balanceSheets[0].equals(balanceSheet2)).toBeTruthy();
    });
  });

  describe("Portfolio", () => {
    test("calculate average cash flow", () => {
      company.addCashFlow(new CashFlow(1000, 500, 2021));
      company.addCashFlow(new CashFlow(2000, 1000, 2022));

      const cashFlow = portfolio.averageCashFlow(company);

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
      const cashFlow2 = new CashFlow(6000, 5000, 2021);
      expect(cashFlow.equals(cashFlow)).toBeTruthy();
      expect(cashFlow.equals(cashFlow2)).toBeFalsy();
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

      expect(
        balanceSheet.equals(new BalanceSheet(0, 0, 0, 0, 2021))
      ).toBeFalsy();
    });

    test("book value equals total assets minus total liabilities", () => {
      expect(balanceSheet.bookValue).toBe(-4000);
    });
  });

  describe("Financial Ratios", () => {
    test("can get the free cash flow yield", () => {
      company.addCashFlow(new CashFlow(20, 10, 2021));

      portfolio.buildFinancialAnalysis(company);

      const ratio = company.financialRatios.at(0);

      expect(ratio?.equals(new FinancialRatios(2021, 10))).toBeTruthy();
      expect(ratio?.sameYear(new FinancialRatios(2021))).toBeTruthy();
    });
  });
});
