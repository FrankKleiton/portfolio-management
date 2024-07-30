import path from "node:path";

import { ViewTemplate } from "../ViewTemplate";
import { StockSummariesView } from "./StockSummariesView";
import {
  StockSummariesViewModel,
  FormattedStockSummary,
} from "./StockSummariesViewModel";

export class StockSummariesViewImpl implements StockSummariesView {
  generateView(viewModel: StockSummariesViewModel): string {
    return this.toHtml(viewModel.getFormattedStockSummaries());
  }

  private toHtml(formattedStockSummaries: FormattedStockSummary[]) {
    const frontPageTemplate = ViewTemplate.create(
      path.join(__dirname, "..", "..", "..", "public/index.html")
    );

    const stocksOverview = this.stocksOverviewTemplate(formattedStockSummaries);

    frontPageTemplate.replace("stocksOverview", stocksOverview);

    return frontPageTemplate.getContent();
  }

  private stocksOverviewTemplate(
    formattedStockSummaries: FormattedStockSummary[]
  ) {
    let result = "";

    for (const formattedStockSummary of formattedStockSummaries) {
      const stockTemplate = ViewTemplate.create(
        `${__dirname}/../../../public/stock.html`
      );

      stockTemplate.replace("ticket", formattedStockSummary.ticket || "Gunk");
      stockTemplate.replace(
        "marketValue",
        formattedStockSummary.marketValue || "Gunk"
      );
      result += stockTemplate.getContent();
    }
    return result;
  }
}
