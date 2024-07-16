import { BalanceSheet } from "./balance-sheet";

export class BalanceSheets {
  private data: Map<number, BalanceSheet> = new Map();

  add(balanceSheet: BalanceSheet) {
    if (balanceSheet.year) {
      this.data.set(balanceSheet.year, balanceSheet);
    }
  }

  toList() {
    return Array.from(this.data.values());
  }
}
