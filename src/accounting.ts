import { CashFlow } from "./cash-flow";
import { Company } from "./company";
import { FinancialRatios } from "./financial-ratios";

export class Portfolio {
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
