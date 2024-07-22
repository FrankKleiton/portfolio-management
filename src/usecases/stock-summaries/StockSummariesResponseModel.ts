import { StockSummary } from "./StockSummary";

export class StockSummariesResponseModel {
  private stocks: StockSummary[] = [];

  addStockSummary(stock: StockSummary) {
    this.stocks.push(stock);
  }

  getStockSummaries() {
    return this.stocks;
  }
}
