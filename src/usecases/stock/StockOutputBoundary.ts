import { StockResponseModel } from "./StockResponseModel";
import { StockViewModel } from "./StockViewModel";

export interface StockOutputBoundary {
  present(responseModel: StockResponseModel): void;
  getViewModel(): StockViewModel | null;
}
