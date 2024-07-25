import { ParsedRequest } from "../../http/ParsedRequest";
import { StockSummariesOutputBoundary } from "../../usecases/stock-summaries/StockSummariesOutputBoundary";
import { StockSummariesView } from "../../views/stock-summaries/StockSummariesView";
import { StockSummariesInputBoundary } from "../../usecases/stock-summaries/StockSummariesInputBoundary";

export class StockSummariesController {
  constructor(
    private useCase: StockSummariesInputBoundary,
    private presenter: StockSummariesOutputBoundary,
    private view: StockSummariesView
  ) {}
  async handle(request: ParsedRequest) {
    await this.useCase.summarizeStocks(this.presenter);

    return this.view.generateView(this.presenter.getViewModel());
  }
}
