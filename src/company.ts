import { BalanceSheet } from "./balance-sheet";
import { CashFlow } from "./cash-flow";

export class Company {
  private _cashFlows: CashFlow[] = [];
  private _balanceSheets: BalanceSheet[] = [];

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

  addBalanceSheet(balanceSheet: BalanceSheet) {
    const i = this._balanceSheets.findIndex((c) => balanceSheet.sameYear(c));

    if (i > -1) {
      this._balanceSheets[i] = balanceSheet;
    } else {
      this._balanceSheets.push(balanceSheet);
    }
  }

  get balanceSheets() {
    return this._balanceSheets;
  }
}
