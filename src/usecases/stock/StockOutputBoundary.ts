import { StockResponseModel } from "./StockResponseModel";

export interface StockOutputBoundary {
  present(responseModel: StockResponseModel): void;
}
