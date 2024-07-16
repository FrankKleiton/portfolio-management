import { Statement } from "./statement";

export class FinancialAnalysis extends Statement {
  constructor(year?: number, public freeCashFlowYield: number = 0) {
    super(year);
  }
}
