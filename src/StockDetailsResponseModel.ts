import { Stock } from "./Stock";

export class StockDetailsResponseModel {
  private stocks: Stock[] = [];

  addStockDetail(stock: Stock) {
    this.stocks.push(stock);
  }

  getStockDetails() {
    return this.stocks;
  }
}
