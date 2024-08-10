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
  public ticket: string = "";
  public marketValue: string = "";
  public freeCashFlows: FormattedFreeCashFlow[] = [];

  get periods() {
    return this.freeCashFlows.map((fcf) => fcf.period);
  }
}

export class FormattedFreeCashFlow {
  public value: string = "";
  public period: string = "";
}
