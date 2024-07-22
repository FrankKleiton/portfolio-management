import { Stock } from "../../entities/Stock";

export class StockResponseModel {
  private stocks: Stock[] = [];

  addStock(stock: Stock) {
    this.stocks.push(stock);
  }

  getStocks() {
    return this.stocks;
  }
}
