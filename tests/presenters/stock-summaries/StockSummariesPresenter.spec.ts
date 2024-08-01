import { PerformanceValue } from "../../../src/entities/PerformanceValue";
import { Period } from "../../../src/entities/Period";
import { StockSummariesPresenter } from "../../../src/presenters/stock-summaries/StockSummariesPresenter";
import { StockSummariesResponseModel } from "../../../src/usecases/stock-summaries/StockSummariesResponseModel";
import { StockSummary } from "../../../src/usecases/stock-summaries/StockSummary";

describe("StockPresenter", () => {
  let presenter: StockSummariesPresenter;
  let responseModel: StockSummariesResponseModel;

  beforeEach(() => {
    presenter = new StockSummariesPresenter();
    responseModel = new StockSummariesResponseModel();
  });
  test("presenter wiring", () => {
    presenter.present(responseModel);

    expect(presenter.getViewModel()).not.toBeNull();
  });

  test("given no stocks presented", () => {
    presenter.present(responseModel);

    expect(presenter.getViewModel()?.getFormattedStockSummaries()).toHaveLength(
      0
    );
  });

  test("given one stock presented", () => {
    const stockSummary = new StockSummary();
    stockSummary.ticket = "VALE3";
    stockSummary.marketValue = 1000000;
    stockSummary.freeCashFlows = [
      new PerformanceValue(1000000, new Period(2021)),
    ];

    responseModel.addStockSummary(stockSummary);

    presenter.present(responseModel);

    const formattedStock = presenter
      .getViewModel()
      ?.getFormattedStockSummaries()
      .at(0);
    expect(formattedStock?.ticket).toBe("VALE3");
    expect(formattedStock?.marketValue).toBe(`R$ 1.000.000,00`);
    expect(formattedStock?.freeCashFlows?.at(0)?.value).toBe("R$ 1.000.000,00");
  });
});
