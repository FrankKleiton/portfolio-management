export class StockViewModel {
  private viewableStocks: ViewableStock[] = [];

  addModel(viewableStock: ViewableStock) {
    this.viewableStocks.push(viewableStock);
  }
  getStocks(): ViewableStock[] {
    return this.viewableStocks;
  }
}

export class ViewableStock {
  ticket = "";
  marketValue = "";
}
