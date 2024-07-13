export class CashFlow {
  constructor(
    private operational: number = 0,
    private investing: number = 0,
    private year?: number
  ) {}

  get freeCashFlow() {
    return this.operational - this.investing;
  }

  equals(cashFlow: CashFlow) {
    return (
      this.operational === cashFlow.operational &&
      this.investing === cashFlow.investing
    );
  }

  plus(cashFlow: CashFlow) {
    const operational = this.operational + cashFlow.operational;
    const investing = this.investing + cashFlow.investing;

    return new CashFlow(operational, investing);
  }

  sameYear(cashFlow: CashFlow) {
    return this.year === cashFlow.year;
  }

  divide(divisor: number): CashFlow {
    return new CashFlow(this.operational / divisor, this.investing / divisor);
  }
}
