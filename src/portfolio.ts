import { CashFlow } from "./cash-flow";
import { CashFlowTypes } from "./cash-flow-types";
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
  buildAverageCashFlow(company: Company) {
    const found = company.getAverageCashFlow();

    const average = company.cashFlows
      .filter((c) => c.type != CashFlowTypes.AVERAGE)
      .reduce(
        (p, c) => p.plus(c),
        new CashFlow(0, 0, undefined, CashFlowTypes.AVERAGE)
      )
      .divide(found ? company.cashFlows.length - 1 : company.cashFlows.length);

    if (found) {
      for (const [index, cashFlow] of company.cashFlows.entries()) {
        if (cashFlow.equals(found)) {
          company.cashFlows[index] = average;
        }
      }
    } else {
      company.addCashFlow(average);
    }
  }
}
