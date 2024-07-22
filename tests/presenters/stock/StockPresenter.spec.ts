import { Stock } from "../../../src/entities/Stock";
import { StockPresenter } from "../../../src/presenters/stock/StockPresenter";
import { StockResponseModel } from "../../../src/usecases/stock/StockResponseModel";

describe("StockPresenter", () => {
  let presenter: StockPresenter;
  let responseModel: StockResponseModel;

  beforeEach(() => {
    presenter = new StockPresenter();
    responseModel = new StockResponseModel();
  });
  test("presenter wiring", () => {
    presenter.present(responseModel);

    expect(presenter.getViewModel()).not.toBeNull();
  });

  test("given no stocks presented", () => {
    presenter.present(responseModel);

    expect(presenter.getViewModel()?.getStocks()).toHaveLength(0);
  });

  test("given one stock presented", () => {
    responseModel.addStock(new Stock("VALE3", 1000000));

    presenter.present(responseModel);

    const viewableStock = presenter.getViewModel()?.getStocks().at(0);
    expect(viewableStock?.ticket).toBe("VALE3");
    expect(viewableStock?.marketValue).toBe(`R$ 1.000.000,00`);
  });
});
