import { AverageCashFlow } from "./average-cash-flow";
import { BalanceSheet } from "./balance-sheet";
import { CashFlow } from "./cash-flow";
import { FinancialRatios } from "./financial-ratios";
class CashFlows {
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

export class Company {
  public cashFlows = new CashFlows();
  private _balanceSheets: BalanceSheet[] = [];
  private _financialRatios: FinancialRatios[] = [];

  constructor(public name: string, public marketValue: number) {}

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

  get financialRatios() {
    return this._financialRatios;
  }

  addFinancialRatio(financialRatios: FinancialRatios) {
    this._financialRatios.push(financialRatios);
  }
}
