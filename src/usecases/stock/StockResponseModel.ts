import { Stock } from "../../entities/Stock";

export class StockResponseModel {
  private stocks: Stock[] = [];

  addStockDetail(stock: Stock) {
    this.stocks.push(stock);
  }

  getStockDetails() {
    return this.stocks;
  }
}
