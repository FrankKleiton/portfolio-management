import { Context } from "../../Context";
import { Stock } from "../../entities/Stock";
import { StockSummariesInputBoundary } from "./StockSummariesInputBoundary";
import { StockSummariesOutputBoundary } from "./StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "./StockSummariesResponseModel";
import { StockSummary } from "./StockSummary";

export class StockSummariesUseCase implements StockSummariesInputBoundary {
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
    const freeCashFlow = stock.operationalCashFlow + stock.investingCashFlow;
    const summary = new StockSummary();
    summary.marketValue = stock.marketValue;
    summary.ticket = stock.ticket;
    summary.freeCashFlow = freeCashFlow;
    summary.freeCashFlowYield = freeCashFlow / stock.marketValue;
    return summary;
  }
}
