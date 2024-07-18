import { Stock } from "../src/Stock";
import { WebScraper } from "../src/WebScraper";

export class InMemoryWebScraper implements WebScraper {
  private stocks: Stock[] = [];

  addStock(stock: Stock) {
    this.stocks.push(stock);
  }

  async collectStock(ticket: string): Promise<Stock | undefined> {
    return this.stocks.find((t) => t.equals(new Stock(ticket)));
  }

  clearAll() {
    this.stocks = [];
  }
}
