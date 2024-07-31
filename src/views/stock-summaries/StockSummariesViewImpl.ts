import path from "node:path";

import { ViewTemplate } from "../ViewTemplate";
import { StockSummariesView } from "./StockSummariesView";
import {
  StockSummariesViewModel,
  FormattedStockSummary,
  FormattedFreeCashFlow,
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
    frontPageTemplate.replace(
      "freeCashFlows",
      this.stocksFreeCashFlowTemplate(formattedStockSummaries)
    );

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

  private stocksFreeCashFlowTemplate(
    formattedStockSummaries: FormattedStockSummary[]
  ) {
    const years = this.years(
      formattedStockSummaries.at(0)?.freeCashFlows || []
    );

    const freeCashFlows = this.freeCashFlows(formattedStockSummaries || []);

    const freeCashFlowsTemplate = ViewTemplate.create(
      `${__dirname}/../../../public/freeCashFlows.html`
    );

    freeCashFlowsTemplate.replace("years", years);
    freeCashFlowsTemplate.replace("freeCashFlows", freeCashFlows);
    return freeCashFlowsTemplate.getContent();
  }

  private years(formattedFreeCashFlows: FormattedFreeCashFlow[]) {
    let years = "";
    for (const freeCashFlow of formattedFreeCashFlows || []) {
      const thTemplate = ViewTemplate.create(
        `${__dirname}/../../../public/th.html`
      );

      thTemplate.replace("value", freeCashFlow.year?.toString() || "Gunk");

      years += thTemplate.getContent();
    }
    return years;
  }

  private freeCashFlows(formattedStockSummaries: FormattedStockSummary[]) {
    let stocksCashFlow = "";
    for (const formattedStockSummary of formattedStockSummaries) {
      const thTemplate = ViewTemplate.create(
        `${__dirname}/../../../public/td.html`
      );

      thTemplate.replace("value", formattedStockSummary.ticket || "Gunk!");
      let stockFreeCashFlow = thTemplate.getContent();

      for (const freeCashFlow of formattedStockSummary.freeCashFlows || []) {
        const thTemplate = ViewTemplate.create(
          `${__dirname}/../../../public/td.html`
        );

        thTemplate.replace("value", freeCashFlow.value?.toString() || "Gunk");

        stockFreeCashFlow += thTemplate.getContent();
      }

      const trTemplate = ViewTemplate.create(
        `${__dirname}/../../../public/tr.html`
      );

      trTemplate.replace("value", stockFreeCashFlow);

      stocksCashFlow += trTemplate.getContent();
    }
    return stocksCashFlow;
  }
}
