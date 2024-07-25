import { StockSummariesViewModel } from "./StockSummariesViewModel";

export interface StockSummariesView {
  generateView(viewModel: StockSummariesViewModel): string;
}
