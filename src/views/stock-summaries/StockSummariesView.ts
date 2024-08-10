import { ViewUtils } from "../ViewUtils";
import { StockSummariesViewModel } from "./StockSummariesViewModel";

export abstract class StockSummariesView extends ViewUtils {
  abstract generateView(viewModel: StockSummariesViewModel): string;
}
