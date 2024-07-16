import { Statement } from "./statement";

export class CashFlow extends Statement {
  constructor(
    public operational: number,
    public investing: number,
    year?: number
  ) {
    super(year);
  }

  get freeCashFlow() {
    return this.operational - this.investing;
  }

  plus(cashFlow: CashFlow) {
    const operational = this.operational + cashFlow.operational;
    const investing = this.investing + cashFlow.investing;

    return new CashFlow(operational, investing);
  }

  divide(divisor: number): CashFlow {
    return new CashFlow(this.operational / divisor, this.investing / divisor);
  }
}
