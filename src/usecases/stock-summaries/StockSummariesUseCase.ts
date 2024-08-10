import { Context } from "../../Context";
import { StockSummariesInputBoundary } from "./StockSummariesInputBoundary";
import { Stock } from "../../entities/Stock";
import { StockSummariesOutputBoundary } from "./StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "./StockSummariesResponseModel";
import { StockSummary } from "./StockSummary";
import { CorporateAccounting } from "../../entities/CorporateAccounting";
import { FinancialAnalysis } from "../../entities/FinancialAnalysis";

export class StockSummariesUseCase implements StockSummariesInputBoundary {
  async summarizeStocks(
    presenter: StockSummariesOutputBoundary
  ): Promise<void> {
    const responseModel = new StockSummariesResponseModel();
    const tickets = await Context.databaseGateway.findAllTickets();

    for (const ticket of tickets) {
      const stock = await Context.webScraperGateway.collectStock(ticket);

      if (stock) {
        const cashFlows = await Context.webScraperGateway.collectCashFlows(
          ticket
        );

        const analysis = CorporateAccounting.analyse(
          cashFlows,
          stock.marketValue
        );

        responseModel.addStockSummary(this.summarizeStock(stock, analysis));
      }
    }

    presenter.present(responseModel);
  }

  summarizeStock(stock: Stock, financialReport: FinancialAnalysis) {
    const summary = new StockSummary();
    summary.marketValue = stock.marketValue;
    summary.ticket = stock.ticket;
    summary.freeCashFlows = financialReport.freeCashFlows;
    summary.freeCashFlowsYields = financialReport.freeCashFlowsYields;
    return summary;
  }
}
