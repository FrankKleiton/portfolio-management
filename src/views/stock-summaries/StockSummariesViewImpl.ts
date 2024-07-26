import { StockSummariesView } from "./StockSummariesView";
import { StockSummariesViewModel } from "./StockSummariesViewModel";
import { readFileSync } from "node:fs";
import path from "node:path";

export class StockSummariesViewImpl implements StockSummariesView {
  generateView(viewModel: StockSummariesViewModel): string {
    let html = readFileSync(
      path.join(__dirname, "..", "..", "..", "public/index.html"),
      {
        encoding: "utf-8",
      }
    );

    let stocksOverview = "";
    for (const viewableStockSumary of viewModel.getViewableStockSummaries()) {
      stocksOverview += `
        <tr>
          <td>${viewableStockSumary.ticket}</td>
          <td>${viewableStockSumary.marketValue}</td>
        </tr>
      `;
    }

    return html.replace("{{stocksOverview}}", stocksOverview);
  }
}
