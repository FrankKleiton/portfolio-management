import { StockDetailsUseCase } from "../src/StockDetailsUseCase";
import { Stock } from "../src/Stock";
import { inMemoryStockGateway, inMemoryWebScraper } from "./utils";
import { StockDetailsOutputBoundary } from "../src/StockDetailsOutputBoundary";
import { StockDetailsResponseModel } from "../src/StockDetailsResponseModel";

class StockDetailsPresenterSpy implements StockDetailsOutputBoundary {
  public responseModel: StockDetailsResponseModel | null = null;

  present(responseModel: StockDetailsResponseModel) {
    this.responseModel = responseModel;
  }
}

describe("StockDetailsUseCase", () => {
  test("usecase wiring", async () => {
    const useCase = new StockDetailsUseCase();
    const presenterSpy = new StockDetailsPresenterSpy();
    await useCase.detailStocks(presenterSpy);

    expect(presenterSpy.responseModel).not.toBeNull();
  });

  describe("given no stock details", () => {
    test("none stocks presented", async () => {
      const useCase = new StockDetailsUseCase();
      const presenterSpy = new StockDetailsPresenterSpy();
      await useCase.detailStocks(presenterSpy);

      expect(presenterSpy.responseModel?.getStockDetails()).toHaveLength(0);
    });
  });

  describe("given one stock details", () => {
    test("one stock is presented", async () => {
      await inMemoryStockGateway().saveTicket("VALE3");
      await inMemoryWebScraper().addStock(new Stock("VALE3"));
      const useCase = new StockDetailsUseCase();
      const presenterSpy = new StockDetailsPresenterSpy();
      await useCase.detailStocks(presenterSpy);

      expect(presenterSpy.responseModel?.getStockDetails()).toHaveLength(1);
    });
  });
});
