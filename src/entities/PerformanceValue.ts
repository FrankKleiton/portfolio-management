import { Period } from "./Period";
class NumericParser {
  parse(value: string) {
    const amounts: { [key: string]: number } = {
      M: 1000000,
      B: 1000000000,
    };
    const suffix = value.at(-1) || "M";
    return (
      Number.parseFloat(value.replace(` ${suffix}`, "").replace(/\,/g, ".")) *
      +amounts[suffix]
    );
  }
}
export class PerformanceValue {
  constructor(public value: number, public period: Period) {}

  equals(performanceValue: PerformanceValue) {
    return (
      this.value == performanceValue.value &&
      this.period.equals(performanceValue.period)
    );
  }
}
