import { CashFlow } from "./cash-flow";
import { Company } from "./company";

export class Accounting {
  averageCashFlow(company: Company): CashFlow {
    return company.cashFlows
      .reduce((p, c) => p.plus(c), new CashFlow(0, 0))
      .divide(company.cashFlows.length);
  }
}
