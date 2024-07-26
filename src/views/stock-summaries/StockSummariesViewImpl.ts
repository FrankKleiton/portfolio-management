import path from "node:path";

import { ViewTemplate } from "../ViewTemplate";
import { StockSummariesView } from "./StockSummariesView";
import {
  StockSummariesViewModel,
  ViewableStockSummary,
} from "./StockSummariesViewModel";

export class StockSummariesViewImpl implements StockSummariesView {
  generateView(viewModel: StockSummariesViewModel): string {
    return this.toHtml(viewModel.getViewableStockSummaries());
  }

  private toHtml(viewableStockSummaries: ViewableStockSummary[]) {
    const frontPageTemplate = ViewTemplate.create(
      path.join(__dirname, "..", "..", "..", "public/index.html")
    );

    const stocksOverview = this.stocksOverviewTemplate(viewableStockSummaries);

    frontPageTemplate.replace("stocksOverview", stocksOverview);

    return frontPageTemplate.getContent();
  }

  private stocksOverviewTemplate(
    viewableStockSummaries: ViewableStockSummary[]
  ) {
    let result = "";

    for (const viewableStockSumary of viewableStockSummaries) {
      const stockTemplate = ViewTemplate.create(
        `${__dirname}/../../../public/stock.html`
      );

      stockTemplate.replace("ticket", viewableStockSumary.ticket || "Gunk");
      stockTemplate.replace(
        "marketValue",
        viewableStockSumary.marketValue || "Gunk"
      );
      result += stockTemplate.getContent();
    }
    return result;
  }
}
