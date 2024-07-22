import { StockSummariesResponseModel } from "./StockSummariesResponseModel";
import { StockSummariesViewModel } from "./StockSummariesViewModel";

export interface StockSummariesOutputBoundary {
  present(responseModel: StockSummariesResponseModel): void;
  getViewModel(): StockSummariesViewModel | null;
}
