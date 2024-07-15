import { Statement } from "./statement";

export class BalanceSheet extends Statement {
  constructor(
    public currentAsset: number,
    public nonCurrentAsset: number,
    public currentLiabilities: number,
    public nonCurrentLiabilities: number,
    year: number
  ) {
    super(year);
  }

  get totalAssets() {
    return this.currentAsset + this.nonCurrentAsset;
  }

  get totalLiabilities() {
    return this.currentLiabilities + this.nonCurrentLiabilities;
  }

  get bookValue() {
    return this.totalAssets - this.totalLiabilities;
  }
}
