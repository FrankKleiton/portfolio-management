import { StockSummariesView } from "./StockSummariesView";
import {
  StockSummariesViewModel,
  FormattedStockSummary,
} from "./StockSummariesViewModel";
import { FreeCashFlowTablePartialView } from "./FreeCashFlowTablePartialView";
import { StockOverviewPartialView } from "./StockOverviewPartialView";

export class StockSummariesViewImpl extends StockSummariesView {
  constructor() {
    super();
  }

  generateView(viewModel: StockSummariesViewModel): string {
    return this.toHtml(viewModel.getFormattedStockSummaries());
  }

  private toHtml(formattedStockSummaries: FormattedStockSummary[]) {
    const template = this.template("index");

    this.partials.set(
      "stocksOverview",
      new StockOverviewPartialView(formattedStockSummaries)
    );

    this.partials.set(
      "freeCashFlows",
      new FreeCashFlowTablePartialView(formattedStockSummaries)
    );

    this.addPartialsTo(template);

    return template.getContent();
  }
}
