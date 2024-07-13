import { CashFlow } from "./cash-flow";

export class Company {
  private _cashFlows: CashFlow[] = [];

  constructor(public name: string) {}

  addCashFlow(cashFlow: CashFlow) {
    const i = this._cashFlows.findIndex((c) => cashFlow.sameYear(c));

    if (i > -1) {
      this._cashFlows[i] = cashFlow;
    } else {
      this._cashFlows.push(cashFlow);
    }
  }

  get cashFlows() {
    return this._cashFlows;
  }
}
