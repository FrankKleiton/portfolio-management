import { PartialView } from "../PartialView";
import { TableBodyPartialView } from "./TableBodyPartialView";
import { TableHeaderPartialView } from "./TableHeaderPartialView";
import { FormattedStockSummary } from "./StockSummariesViewModel";

export class FreeCashFlowTablePartialView extends PartialView {
  constructor(private formattedStockSummaries: FormattedStockSummary[]) {
    super();
  }

  generatePartialView() {
    const template = this.template("freeCashFlows");

    // TODO: Move these code to the presenter
    const periods = this.formattedStockSummaries[0].periods;

    const summaries = this.formattedStockSummaries.map((summary) => {
      return [summary.ticket].concat(
        summary.freeCashFlows.map((fcf) => fcf.value)
      );
    });

    this.partials.set("years", new TableHeaderPartialView(periods));

    this.partials.set("freeCashFlows", new TableBodyPartialView(summaries));

    this.addPartialsTo(template);

    return template.getContent();
  }
}
