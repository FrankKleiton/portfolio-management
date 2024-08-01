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
      if (b.period.equals(a.period)) {
        return 0;
      }
      if (b.period.greaterThen(a.period)) {
        return 1;
      }
      return -1;
    });

    return cashFlows;
  }

  calculateFreeCashFlows(cashFlows: CashFlow[]) {
    return cashFlows.map(
      (cf) => new PerformanceValue(cf.operational + cf.investing, cf.period)
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
        const averageFreeCashFlow = this.calculateAverage(freeCashFlows);

        if (averageFreeCashFlow) {
          freeCashFlows.push(averageFreeCashFlow);
        }
        responseModel.addStockSummary(
          this.summarizeStock(stock, freeCashFlows)
        );
      }
    }

    presenter.present(responseModel);
  }
  calculateAverage(values: PerformanceValue[]) {
    let sum = values.at(0);

    if (!sum) {
      return null;
    }

    for (let i = 1; i < values.length; i++) {
      sum = sum?.plus(values[i]);
    }

    console.log("sum", sum);
    const division = sum.divide(values.length);
    console.log("division", division);
    return division;
  }

  summarizeStock(stock: Stock, freeCashFlows: PerformanceValue[]) {
    const summary = new StockSummary();
    summary.marketValue = stock.marketValue;
    summary.ticket = stock.ticket;
    summary.freeCashFlows = freeCashFlows;
    return summary;
  }
}
