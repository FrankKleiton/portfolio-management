import { StockSummariesView } from "../../src/views/stock-summaries/StockSummariesView";
import { StockSummariesViewModel } from "../../src/views/stock-summaries/StockSummariesViewModel";

export class StockSummariesViewImplSpy implements StockSummariesView {
  private viewModel: StockSummariesViewModel = new StockSummariesViewModel();

  getViewModel(): StockSummariesViewModel {
    return this.viewModel;
  }
  generateView(viewModel: StockSummariesViewModel): string {
    this.viewModel = viewModel;

    return "";
  }
}
