import { Context } from "../src/Context";
import { StockDetailsUseCase } from "../src/StockDetailsUseCase";
import { Stock } from "../src/Stock";
import { InMemoryWebScraper } from "./InMemoryWebScraper";

describe("StockDetailsUseCase", () => {
  test("detail one stock", async () => {
    await Context.stockGateway.save(new Stock("VALE3"));
    await (Context.webScraper as InMemoryWebScraper).addStock(
      new Stock("VALE3", 1000000)
    );
    const useCase = new StockDetailsUseCase();

    const presentableStocks = await useCase.detailStocks();

    expect(presentableStocks).toHaveLength(1);
    expect(presentableStocks.at(0)?.ticket).toBe("VALE3");
    expect(presentableStocks.at(0)?.marketValue).toBe(
      StockDetailsUseCase.SimpleCurrencyFormatter.format(1000000)
    );
  });
});
