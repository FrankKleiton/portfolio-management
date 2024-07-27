import { Year } from "./Year";

export class PerformanceValue {
  constructor(private value: number, private year: Year) {}

  equals(performanceValue: PerformanceValue) {
    return (
      this.value == performanceValue.value &&
      this.year.equals(performanceValue.year)
    );
  }
}
