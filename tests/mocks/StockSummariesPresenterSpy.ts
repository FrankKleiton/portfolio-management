import { StockSummariesOutputBoundary } from "../../src/usecases/stock-summaries/StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "../../src/usecases/stock-summaries/StockSummariesResponseModel";
import {
  StockSummariesViewModel,
  ViewableStockSummary,
} from "../../src/views/stock-summaries/StockSummariesViewModel";

export class StockSummariesPresenterSpy
  implements StockSummariesOutputBoundary
{
  private viewModel: StockSummariesViewModel = new StockSummariesViewModel();
  getViewModel(): StockSummariesViewModel {
    return this.viewModel;
  }
  public responseModel: StockSummariesResponseModel | null = null;

  present(responseModel: StockSummariesResponseModel) {
    this.responseModel = responseModel;
    this.viewModel = new StockSummariesViewModel();

    for (const stockSummary of responseModel.getStockSummaries()) {
      this.viewModel?.addModel(new ViewableStockSummary());
    }
  }
}
