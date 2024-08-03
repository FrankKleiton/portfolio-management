import { PerformanceValue } from "./PerformanceValue";

export class CashFlow {
  constructor(
    public operational: PerformanceValue,
    public investing: PerformanceValue
  ) {}

  get period() {
    return this.operational.period;
  }
}
