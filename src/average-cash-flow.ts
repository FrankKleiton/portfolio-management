import { CashFlow } from "./cash-flow";

export class AverageCashFlow extends CashFlow {
  constructor(operational: number, investing: number) {
    super(operational, investing, undefined);
  }

  static is(cashFlow: CashFlow) {
    return cashFlow instanceof AverageCashFlow;
  }

  plus(cashFlow: CashFlow) {
    const next = super.plus(cashFlow);

    return new AverageCashFlow(next.operational, next.investing);
  }

  divide(divisor: number): CashFlow {
    const next = super.divide(divisor);

    return new AverageCashFlow(next.operational, next.investing);
  }
}
