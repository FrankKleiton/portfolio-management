import { StockDetailsResponseModel } from "./StockDetailsResponseModel";

export interface StockDetailsOutputBoundary {
  present(responseModel: StockDetailsResponseModel): void;
}
