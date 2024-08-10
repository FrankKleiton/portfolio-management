import { PartialView } from "../PartialView";
import { FormattedStockSummary } from "./StockSummariesViewModel";

export class StockOverviewPartialView extends PartialView {
  constructor(private formattedStockSummaries: FormattedStockSummary[]) {
    super();
  }

  generatePartialView() {
    let result = "";

    for (const fss of this.formattedStockSummaries) {
      const template = this.template("stock");

      template.replace("ticket", fss.ticket);
      template.replace("marketValue", fss.marketValue);

      result += template.getContent();
    }

    return result;
  }
}
