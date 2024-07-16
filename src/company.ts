import { BalanceSheet } from "./balance-sheet";
import { CashFlow } from "./cash-flow";
import { CashFlowTypes } from "./cash-flow-types";
import { FinancialRatios } from "./financial-ratios";

export class Company {
  private _cashFlows: CashFlow[] = [];
  private _balanceSheets: BalanceSheet[] = [];
  private _financialRatios: FinancialRatios[] = [];

  constructor(public name: string, public marketValue: number) {}

  getAverageCashFlow() {
    return this._cashFlows.find((cf) => cf.type == CashFlowTypes.AVERAGE);
  }

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

  get financialRatios() {
    return this._financialRatios;
  }

  addFinancialRatio(financialRatios: FinancialRatios) {
    this._financialRatios.push(financialRatios);
  }
}
