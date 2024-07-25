import { StockSummariesInputBoundary } from "../../src/usecases/stock-summaries/StockSummariesInputBoundary";
import { StockSummariesOutputBoundary } from "../../src/usecases/stock-summaries/StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "../../src/usecases/stock-summaries/StockSummariesResponseModel";

export class StockSummariesUseCaseSpy implements StockSummariesInputBoundary {
  wasExecuted: boolean = false;
  responseModel: StockSummariesResponseModel =
    new StockSummariesResponseModel();

  async summarizeStocks(
    presenter: StockSummariesOutputBoundary
  ): Promise<void> {
    this.wasExecuted = true;
    presenter.present(this.responseModel);
  }
}
