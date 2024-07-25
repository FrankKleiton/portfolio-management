import { StockSummariesResponseModel } from "./StockSummariesResponseModel";
import { StockSummariesViewModel } from "../../views/stock-summaries/StockSummariesViewModel";

export interface StockSummariesOutputBoundary {
  present(responseModel: StockSummariesResponseModel): void;
  getViewModel(): StockSummariesViewModel;
}
