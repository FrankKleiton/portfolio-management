import { CashFlow } from "./cash-flow";
import { Company } from "./company";
import { FinancialRatios } from "./financial-ratios";

export class Portfolio {
  private _companies: Company[] = [];

  get companies() {
    return this._companies;
  }

  addCompany(company: Company) {
    const i = this._companies.findIndex((c) => c.name == company.name);

    if (i > -1) {
      this._companies[i] = company;
    } else {
      this._companies.push(company);
    }
  }

  buildFinancialAnalysis(company: Company) {
    for (const cashFlow of company.cashFlows) {
      const ratio = new FinancialRatios(cashFlow.year);

      ratio.freeCashFlowYield =
        (cashFlow.freeCashFlow / company.marketValue) * 100;

      company.addFinancialRatio(ratio);
    }
  }
  averageCashFlow(company: Company): CashFlow {
    return company.cashFlows
      .reduce((p, c) => p.plus(c), new CashFlow(0, 0))
      .divide(company.cashFlows.length);
  }
}
