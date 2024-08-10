import { CashFlow } from "./CashFlow";
import { FinancialAnalysis } from "./FinancialAnalysis";
import { PerformanceValue } from "./PerformanceValue";

export class CorporateAccounting {
  static analyse(cashFlows: CashFlow[], marketValue: number) {
    const freeCashFlows = cashFlows.map((cf) =>
      CorporateAccounting.freeCashFlow(cf.operational, cf.investing)
    );
    const averageFreeCashFlow = this.average(freeCashFlows);

    if (averageFreeCashFlow) {
      freeCashFlows.push(averageFreeCashFlow);
    }

    const freeCashFlowsYields = freeCashFlows.map((fcf) =>
      CorporateAccounting.yield(fcf, marketValue)
    );

    return new FinancialAnalysis(freeCashFlows, freeCashFlowsYields);
  }

  private static freeCashFlow(
    operational: PerformanceValue,
    investing: PerformanceValue
  ) {
    return operational.plus(investing);
  }

  private static yield(value: PerformanceValue, marketValue: number) {
    return value.divide(marketValue);
  }

  private static average(values: PerformanceValue[]) {
    let sum = values.at(0);

    if (!sum) {
      return null;
    }

    for (let i = 1; i < values.length; i++) {
      sum = sum?.plus(values[i]);
    }

    return sum.divide(values.length);
  }
}
