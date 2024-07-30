import { StockSummariesOutputBoundary } from "../../usecases/stock-summaries/StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "../../usecases/stock-summaries/StockSummariesResponseModel";
import { StockSummary } from "../../usecases/stock-summaries/StockSummary";
import {
  StockSummariesViewModel,
  FormattedFreeCashFlow,
  FormattedStockSummary,
} from "../../views/stock-summaries/StockSummariesViewModel";

export class StockSummariesPresenter implements StockSummariesOutputBoundary {
  static format = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(value)
      .replace(/\s/g, " ");

  private viewModel: StockSummariesViewModel = new StockSummariesViewModel();

  getViewModel(): StockSummariesViewModel {
    return this.viewModel;
  }

  present(responseModel: StockSummariesResponseModel): void {
    this.viewModel = new StockSummariesViewModel();

    for (let stock of responseModel.getStockSummaries()) {
      this.viewModel.addModel(this.makeFormattedStock(stock));
    }
  }

  makeFormattedStock(stock: StockSummary): FormattedStockSummary {
    const formattedStockSummary = new FormattedStockSummary();
    formattedStockSummary.ticket = stock.ticket;

    if (stock.marketValue) {
      formattedStockSummary.marketValue = StockSummariesPresenter.format(
        stock.marketValue
      );
    }

    if (stock.freeCashFlows) {
      formattedStockSummary.freeCashFlows = stock.freeCashFlows.map((sf) => {
        const formattedFreeCashFlow = new FormattedFreeCashFlow();
        formattedFreeCashFlow.value = StockSummariesPresenter.format(sf.value);
        formattedFreeCashFlow.year = sf.year.value;
        return formattedFreeCashFlow;
      });
    }
    return formattedStockSummary;
  }
}
