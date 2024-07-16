import { AverageCashFlow } from "./average-cash-flow";
import { CashFlow } from "./cash-flow";

export class CashFlows {
  private data: Map<number, CashFlow> = new Map();
  private average?: AverageCashFlow;

  averageCashFlow() {
    return this.average;
  }

  add(cashFlow: CashFlow) {
    if (cashFlow instanceof AverageCashFlow) {
      this.average = cashFlow;
    } else {
      if (cashFlow.year) {
        this.data.set(cashFlow.year, cashFlow);
      }
    }
  }

  toList() {
    return Array.from(this.data.values());
  }

  length(): number {
    return this.data.size;
  }
}
