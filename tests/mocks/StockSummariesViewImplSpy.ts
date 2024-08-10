import { StockSummariesView } from "../../src/views/stock-summaries/StockSummariesView";
import { StockSummariesViewModel } from "../../src/views/stock-summaries/StockSummariesViewModel";
import { ViewTemplate } from "../../src/views/ViewTemplate";

export class StockSummariesViewImplSpy extends StockSummariesView {
  template(name: string): ViewTemplate {
    throw new Error("Method not implemented.");
  }
  private viewModel: StockSummariesViewModel = new StockSummariesViewModel();

  getViewModel(): StockSummariesViewModel {
    return this.viewModel;
  }
  generateView(viewModel: StockSummariesViewModel): string {
    this.viewModel = viewModel;

    return "";
  }
}
