import { Year } from "./Year";

export class CashFlow {
  constructor(
    public operational: number,
    public investing: number,
    public year: Year
  ) {}
}
