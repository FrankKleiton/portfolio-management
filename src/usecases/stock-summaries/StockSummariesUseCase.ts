import { Context } from "../../Context";
import { StockSummariesInputBoundary } from "./StockSummariesInputBoundary";
import { Stock } from "../../entities/Stock";
import { StockSummariesOutputBoundary } from "./StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "./StockSummariesResponseModel";
import { StockSummary } from "./StockSummary";
import { CashFlow } from "../../entities/CashFlow";
import { PerformanceValue } from "../../entities/PerformanceValue";

export class StockSummariesUseCase implements StockSummariesInputBoundary {
  async getOrderedCashFlows(ticket: string): Promise<CashFlow[]> {
    let cashFlows = await Context.webScraperGateway.collectCashFlows(ticket);

    cashFlows = cashFlows.sort((a, b) => {
      if (b.year.equals(a.year)) {
        return 0;
      }
      if (b.year.greaterThen(a.year)) {
        return 1;
      }
      return -1;
    });

    return cashFlows;
  }

  calculateFreeCashFlows(cashFlows: CashFlow[]) {
    return cashFlows.map(
      (cf) => new PerformanceValue(cf.operational + cf.investing, cf.year)
    );
  }

  async summarizeStocks(
    presenter: StockSummariesOutputBoundary
  ): Promise<void> {
    const responseModel = new StockSummariesResponseModel();
    const tickets = await Context.databaseGateway.findAllTickets();

    for (const ticket of tickets) {
      const stock = await Context.webScraperGateway.collectStock(ticket);

      if (stock) {
        const cashFlows = await this.getOrderedCashFlows(ticket);
        const freeCashFlows = this.calculateFreeCashFlows(cashFlows);

        responseModel.addStockSummary(
          this.summarizeStock(stock, freeCashFlows)
        );
      }
    }

    presenter.present(responseModel);
  }

  summarizeStock(stock: Stock, freeCashFlows: PerformanceValue[]) {
    const summary = new StockSummary();
    summary.marketValue = stock.marketValue;
    summary.ticket = stock.ticket;
    summary.freeCashFlows = freeCashFlows;
    return summary;
  }
}
