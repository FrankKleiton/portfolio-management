import { PerformanceValue } from "../../entities/PerformanceValue";

export class StockSummary {
  public ticket?: string;
  public marketValue?: number;
  freeCashFlows?: PerformanceValue[];
}
