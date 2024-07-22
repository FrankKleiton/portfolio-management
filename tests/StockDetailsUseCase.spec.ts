import { StockDetailsUseCase } from "../src/StockDetailsUseCase";
import { Stock } from "../src/Stock";
import { inMemoryStockGateway, inMemoryWebScraper } from "./utils";

describe("StockDetailsUseCase", () => {
  test("detail one stock", async () => {
    await inMemoryStockGateway().save(new Stock("VALE3"));
    await inMemoryWebScraper().addStock(new Stock("VALE3", 1000000));
    const useCase = new StockDetailsUseCase();

    const presentableStocks = await useCase.detailStocks();

    expect(presentableStocks).toHaveLength(1);
    expect(presentableStocks.at(0)?.ticket).toBe("VALE3");
    expect(presentableStocks.at(0)?.marketValue).toBe(
      StockDetailsUseCase.SimpleCurrencyFormatter.format(1000000)
    );
  });
});
