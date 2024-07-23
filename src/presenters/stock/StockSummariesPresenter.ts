import { StockSummariesOutputBoundary } from "../../usecases/stock-summaries/StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "../../usecases/stock-summaries/StockSummariesResponseModel";
import { StockSummary } from "../../usecases/stock-summaries/StockSummary";
import {
  StockSummariesViewModel,
  ViewableStockSummary,
} from "../../usecases/stock-summaries/StockSummariesViewModel";

export class StockPresenter implements StockSummariesOutputBoundary {
  static format = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(value)
      .replace(/\s/g, " ");

  private viewModel: StockSummariesViewModel | null = null;

  getViewModel(): StockSummariesViewModel | null {
    return this.viewModel;
  }

  present(responseModel: StockSummariesResponseModel): void {
    this.viewModel = new StockSummariesViewModel();

    for (let stock of responseModel.getStockSummaries()) {
      this.viewModel.addModel(this.makeViewableStock(stock));
    }
  }

  makeViewableStock(stock: StockSummary): ViewableStockSummary {
    const viewableStockSummary = new ViewableStockSummary();
    viewableStockSummary.ticket = stock.ticket;

    if (stock.freeCashFlow) {
      viewableStockSummary.freeCashFlow = StockPresenter.format(
        stock.freeCashFlow
      );
    }

    if (stock.freeCashFlowYield) {
      viewableStockSummary.freeCashFlowYield =
        stock.freeCashFlowYield * 100 + "%";
    }

    if (stock.marketValue) {
      viewableStockSummary.marketValue = StockPresenter.format(
        stock.marketValue
      );
    }
    return viewableStockSummary;
  }
}
