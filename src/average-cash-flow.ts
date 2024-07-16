import { CashFlow } from "./cash-flow";

export class AverageCashFlow extends CashFlow {
  constructor(operational: number, investing: number, year?: number) {
    super(operational, investing, year);
  }

  plus(cashFlow: CashFlow): CashFlow {
    const result = super.plus(cashFlow);

    return new AverageCashFlow(result.operational, result.investing);
  }

  divide(divisor: number): CashFlow {
    return new AverageCashFlow(
      this.operational / divisor,
      this.investing / divisor
    );
  }

  static is(cashFlow: CashFlow) {
    return cashFlow instanceof AverageCashFlow;
  }
}
