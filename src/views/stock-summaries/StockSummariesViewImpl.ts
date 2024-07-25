import { StockSummariesView } from "./StockSummariesView";
import { StockSummariesViewModel } from "./StockSummariesViewModel";

export class StockSummariesViewImpl implements StockSummariesView {
  generateView(viewModel: StockSummariesViewModel): string {
    return "hey";
  }
}
