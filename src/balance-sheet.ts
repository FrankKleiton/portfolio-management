export class BalanceSheet {
  constructor(
    public currentAsset: number,
    public nonCurrentAsset: number,
    public currentLiabilities: number,
    public nonCurrentLiabilities: number,
    private year: number
  ) {}

  sameYear(balanceSheet: BalanceSheet) {
    return this.year === balanceSheet.year;
  }

  equals(balanceSheet: BalanceSheet) {
    return (
      this.currentAsset === balanceSheet.currentAsset &&
      this.nonCurrentAsset === balanceSheet.nonCurrentAsset &&
      this.currentLiabilities === balanceSheet.currentLiabilities &&
      this.nonCurrentLiabilities === balanceSheet.nonCurrentLiabilities
    );
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
