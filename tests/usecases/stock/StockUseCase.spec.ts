import { StockUseCase } from "../../../src/usecases/stock/StockUseCase";
import { Stock } from "../../../src/entities/Stock";
import { inMemoryStockGateway, inMemoryWebScraper } from "../../utils";
import { StockOutputBoundary } from "../../../src/usecases/stock/StockOutputBoundary";
import { StockResponseModel } from "../../../src/usecases/stock/StockResponseModel";
import { StockViewModel } from "../../../src/usecases/stock/StockViewModel";

class StockDetailsPresenterSpy implements StockOutputBoundary {
  getViewModel(): StockViewModel | null {
    throw new Error("Method not implemented.");
  }
  public responseModel: StockResponseModel | null = null;

  present(responseModel: StockResponseModel) {
    this.responseModel = responseModel;
  }
}

describe("StockUseCase", () => {
  let useCase: StockUseCase;
  let presenterSpy: StockDetailsPresenterSpy;

  beforeEach(() => {
    useCase = new StockUseCase();
    presenterSpy = new StockDetailsPresenterSpy();
  });

  test("usecase wiring", async () => {
    await useCase.detailStocks(presenterSpy);

    expect(presenterSpy.responseModel).not.toBeNull();
  });

  describe("given no stock details", () => {
    test("none stocks presented", async () => {
      await useCase.detailStocks(presenterSpy);

      expect(presenterSpy.responseModel?.getStocks()).toHaveLength(0);
    });
  });

  describe("given one stock details", () => {
    test("one stock is presented", async () => {
      await inMemoryStockGateway().saveTicket("VALE3");
      await inMemoryWebScraper().addStock(new Stock("VALE3", 1000));
      await useCase.detailStocks(presenterSpy);

      const details = presenterSpy.responseModel?.getStocks();
      expect(details).toHaveLength(1);
      expect(new Stock("VALE3", 1000).equals(details?.at(0))).toBeTruthy();
    });
  });
});
