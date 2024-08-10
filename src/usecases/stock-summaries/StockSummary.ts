import { PerformanceValue } from "../../entities/PerformanceValue";

export class StockSummary {
  public ticket: string = "";
  public marketValue: number = 0;
  freeCashFlows: PerformanceValue[] = [];
  freeCashFlowsYields: PerformanceValue[] = [];
}
