import { Year } from "./Year";

export class PerformanceValue {
  constructor(public value: number, public year: Year) {}

  equals(performanceValue: PerformanceValue) {
    return (
      this.value == performanceValue.value &&
      this.year.equals(performanceValue.year)
    );
  }
}
