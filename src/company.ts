import { CashFlow } from "./cash-flow";

export class Company {
  private cashFlows: { [key: number]: CashFlow } = {};

  constructor(public name: string) {}

  getCashFlow(year: number): any {
    return this.cashFlows[year];
  }

  addCashFlow(year: number, cashFlow: CashFlow) {
    this.cashFlows[year] = cashFlow;
  }
}
