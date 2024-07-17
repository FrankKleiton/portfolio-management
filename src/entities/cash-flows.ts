import { AverageCashFlow } from "./average-cash-flow";
import { CashFlow } from "./cash-flow";

export class CashFlows {
  private hashMap: Map<number, CashFlow> = new Map();
  private average?: AverageCashFlow;

  averageCashFlow() {
    return this.average;
  }

  add(cashFlow: CashFlow) {
    if (AverageCashFlow.is(cashFlow)) {
      this.average = cashFlow;
    } else {
      if (cashFlow.year) {
        this.hashMap.set(cashFlow.year, cashFlow);
      }
    }
  }

  toList() {
    return Array.from(this.hashMap.values());
  }

  length(): number {
    return this.hashMap.size;
  }
}
