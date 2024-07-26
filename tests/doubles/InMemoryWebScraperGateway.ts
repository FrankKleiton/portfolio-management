import { CashFlow } from "../../src/entities/CashFlow";
import { Stock } from "../../src/entities/Stock";
import { WebScraperGateway } from "../../src/usecases/WebScraperGateway";

export class InMemoryWebScraperGateway implements WebScraperGateway {
  private stocks: Stock[] = [];
  private cashFlows: { [key: string]: CashFlow[] } = {};

  async collectCashFlows(ticket: string): Promise<CashFlow[]> {
    return this.cashFlows[ticket] || [];
  }

  addCashFlow(ticket: string, cashFlow: CashFlow) {
    if (!this.cashFlows[ticket]) {
      this.cashFlows[ticket] = [];
    }
    this.cashFlows[ticket].push(cashFlow);
  }

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
