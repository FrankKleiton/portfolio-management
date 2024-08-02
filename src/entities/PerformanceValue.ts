import { Period } from "./Period";

export class PerformanceValue {
  constructor(public value: number, public period: Period) {}

  equals(performanceValue: PerformanceValue) {
    return (
      this.value == performanceValue.value &&
      this.period.equals(performanceValue.period)
    );
  }

  plus(performanceValue: PerformanceValue) {
    return new PerformanceValue(
      this.value + performanceValue.value,
      this.period.plus(performanceValue.period)
    );
  }

  divide(divider: number) {
    return new PerformanceValue(this.value / divider, this.period);
  }
}
