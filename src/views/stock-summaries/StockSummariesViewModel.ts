export class StockSummariesViewModel {
  private formattedStockSummaries: FormattedStockSummary[] = [];

  addModel(formattedStockSummary: FormattedStockSummary) {
    this.formattedStockSummaries.push(formattedStockSummary);
  }
  getFormattedStockSummaries(): FormattedStockSummary[] {
    return this.formattedStockSummaries;
  }
}

export class FormattedStockSummary {
  public ticket?: string;
  public marketValue?: string;
  public freeCashFlows?: FormattedFreeCashFlow[];
}

export class FormattedFreeCashFlow {
  public value?: string;
  public period?: number;
}
