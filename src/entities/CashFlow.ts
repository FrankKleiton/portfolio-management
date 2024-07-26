import { Year } from "./Year";

export class CashFlow {
  constructor(
    private operational: number,
    private investing: number,
    private year: Year
  ) {}

  getYear() {
    return this.year;
  }

  get freeCashFlow() {
    return this.operational + this.investing;
  }
}
