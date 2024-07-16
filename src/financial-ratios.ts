import { Statement } from "./statement";

export class FinancialRatios extends Statement {
  constructor(year?: number, public freeCashFlowYield: number = 0) {
    super(year);
  }
}
