import { Stock } from "../../src/entities/Stock";
import { WebScraperGateway } from "../../src/gateways/WebScraperGateway";

export class InMemoryWebScraperGateway implements WebScraperGateway {
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
