import { StockSummariesOutputBoundary } from "../../usecases/stock-summaries/StockSummariesOutputBoundary";
import { StockSummariesView } from "../../views/stock-summaries/StockSummariesView";
import { StockSummariesInputBoundary } from "../../usecases/stock-summaries/StockSummariesInputBoundary";
import { Request } from "../../http/Request";
import { Controller } from "../Controller";

export class StockSummariesController implements Controller {
  constructor(
    private useCase: StockSummariesInputBoundary,
    private presenter: StockSummariesOutputBoundary,
    private view: StockSummariesView
  ) {}
  async handle(request: Request) {
    await this.useCase.summarizeStocks(this.presenter);

    return this.view.generateView(this.presenter.getViewModel());
  }
}
