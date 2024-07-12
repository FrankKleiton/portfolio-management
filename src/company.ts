import { CashFlow } from "./cash-flow";

export class Company {
  private cashFlows: { [key: number]: CashFlow } = {};

  constructor(public name: string) {}

  addOperationalCashFlow(year: number, amount: number) {
    if (!this.cashFlows[year]) {
      this.cashFlows[year] = new CashFlow();
    }
    this.cashFlows[year].setOperational(amount);
  }

  getOperationalCashFlow(year: number) {
    return this.cashFlows[year].getOperational();
  }

  addInvestingCashFlow(year: number, amount: number) {
    if (!this.cashFlows[year]) {
      this.cashFlows[year] = new CashFlow();
    }
    this.cashFlows[year].setInvesting(amount);
  }

  getInvestingCashFlow(year: number) {
    return this.cashFlows[year].getInvesting();
  }
}
