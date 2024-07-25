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

    expect(presenter.getViewModel()?.getViewableStockSummaries()).toHaveLength(
      0
    );
  });

  test("given one stock presented", () => {
    const stockSummary = new StockSummary();
    stockSummary.ticket = "VALE3";
    stockSummary.marketValue = 1000000;
    stockSummary.freeCashFlow = 90000;
    stockSummary.freeCashFlowYield = 0.09;

    responseModel.addStockSummary(stockSummary);

    presenter.present(responseModel);

    const viewableStock = presenter
      .getViewModel()
      ?.getViewableStockSummaries()
      .at(0);
    expect(viewableStock?.ticket).toBe("VALE3");
    expect(viewableStock?.marketValue).toBe(`R$ 1.000.000,00`);
    expect(viewableStock?.freeCashFlow).toBe(`R$ 90.000,00`);
    expect(viewableStock?.freeCashFlowYield).toBe(`9%`);
  });
});
