import { BalanceSheet } from "./balance-sheet";

export class BalanceSheets {
  private data: BalanceSheet[] = [];

  add(balanceSheet: BalanceSheet) {
    const i = this.data.findIndex((c) => balanceSheet.sameYear(c));

    if (i > -1) {
      this.data[i] = balanceSheet;
    } else {
      this.data.push(balanceSheet);
    }
  }

  all() {
    return this.data;
  }
}
