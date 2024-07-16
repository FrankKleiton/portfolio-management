import { AverageCashFlow } from "./average-cash-flow";
import { CashFlow } from "./cash-flow";

export class CashFlows {
  private data: CashFlow[] = [];
  private average?: AverageCashFlow;

  averageCashFlow() {
    return this.average;
  }

  add(cashFlow: CashFlow) {
    if (cashFlow instanceof AverageCashFlow) {
      this.average = cashFlow;
    } else {
      const i = this.data.findIndex((c: CashFlow) => cashFlow.sameYear(c));

      if (i > -1) {
        this.data[i] = cashFlow;
      } else {
        this.data.push(cashFlow);
      }
    }
  }

  all() {
    return this.data;
  }

  length(): number {
    return this.data.length;
  }
}
