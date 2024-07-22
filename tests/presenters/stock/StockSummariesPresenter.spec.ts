import { Stock } from "../../../src/entities/Stock";
import { StockPresenter } from "../../../src/presenters/stock/StockSummariesPresenter";
import { StockSummariesResponseModel } from "../../../src/usecases/stock-summaries/StockSummariesResponseModel";

describe("StockPresenter", () => {
  let presenter: StockPresenter;
  let responseModel: StockSummariesResponseModel;

  beforeEach(() => {
    presenter = new StockPresenter();
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
    responseModel.addStockSummary(new Stock("VALE3", 1000000));

    presenter.present(responseModel);

    const viewableStock = presenter
      .getViewModel()
      ?.getViewableStockSummaries()
      .at(0);
    expect(viewableStock?.ticket).toBe("VALE3");
    expect(viewableStock?.marketValue).toBe(`R$ 1.000.000,00`);
  });
});
