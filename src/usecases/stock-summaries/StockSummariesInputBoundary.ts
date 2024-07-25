import { StockSummariesOutputBoundary } from "./StockSummariesOutputBoundary";

export interface StockSummariesInputBoundary {
  summarizeStocks(presenter: StockSummariesOutputBoundary): Promise<void>;
}
