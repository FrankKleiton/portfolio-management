export class StockSummariesViewModel {
  private viewableStockSummaries: ViewableStockSummary[] = [];

  addModel(viewableStockSummary: ViewableStockSummary) {
    this.viewableStockSummaries.push(viewableStockSummary);
  }
  getViewableStockSummaries(): ViewableStockSummary[] {
    return this.viewableStockSummaries;
  }
}

export class ViewableStockSummary {
  public ticket?: string;
  public marketValue?: string;
  public freeCashFlow?: string;
  public freeCashFlowYield?: string;
}
