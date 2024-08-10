import { PerformanceValue } from "./PerformanceValue";

export class FinancialAnalysis {
  constructor(
    public freeCashFlows: PerformanceValue[],
    public freeCashFlowsYields: PerformanceValue[]
  ) {}
}
