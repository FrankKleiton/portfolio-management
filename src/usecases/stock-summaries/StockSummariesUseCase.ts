import { Context } from "../../Context";
import { StockSummariesInputBoundary } from "./StockSummariesInputBoundary";
import { Stock } from "../../entities/Stock";
import { StockSummariesOutputBoundary } from "./StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "./StockSummariesResponseModel";
import { StockSummary } from "./StockSummary";
import { CashFlow } from "../../entities/CashFlow";

export class StockSummariesUseCase implements StockSummariesInputBoundary {
  async getOrderedCashFlows(ticket: string): Promise<CashFlow[]> {
    let cashFlows = await Context.webScraperGateway.collectCashFlows(ticket);

    cashFlows = cashFlows.sort((a, b) => {
      if (a.getYear().equals(b.getYear())) {
        return 0;
      }
      if (a.getYear().greaterThen(b.getYear())) {
        return 1;
      }
      return -1;
    });

    return cashFlows;
  }
  async summarizeStocks(
    presenter: StockSummariesOutputBoundary
  ): Promise<void> {
    const responseModel = new StockSummariesResponseModel();
    const tickets = await Context.databaseGateway.findAllTickets();

    for (const ticket of tickets) {
      const stock = await Context.webScraperGateway.collectStock(ticket);

      if (stock) {
        responseModel.addStockSummary(this.summarizeStock(stock));
      }
    }

    presenter.present(responseModel);
  }

  summarizeStock(stock: Stock) {
    const summary = new StockSummary();
    summary.marketValue = stock.marketValue;
    summary.ticket = stock.ticket;
    return summary;
  }
}
