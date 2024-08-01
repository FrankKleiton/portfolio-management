import { Period } from "./Period";

export class CashFlow {
  constructor(
    public operational: number,
    public investing: number,
    public period: Period
  ) {}
}
