import { Stock } from "../src/Stock";
import { StockGateway } from "../src/StockGateway";

export class InMemoryStockGateway implements StockGateway {
  private stocks: Stock[] = [];

  async save(stock: Stock): Promise<void> {
    this.stocks.push(stock);
  }

  async delete(ticket: string): Promise<void> {
    this.stocks = this.stocks.filter((t) => !t.equals(new Stock(ticket)));
  }

  async findAll(): Promise<Stock[]> {
    return this.stocks;
  }

  async find(ticket: string): Promise<Stock | undefined> {
    return this.stocks.find((t) => t.equals(new Stock(ticket)));
  }

  clearAll() {
    this.stocks = [];
  }
}
