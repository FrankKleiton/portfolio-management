import { StockTrackingUseCase } from "../src/StockTrackingUseCase";
import { Context } from "../src/Context";
import { Stock } from "../src/Stock";
import { InMemoryWebScraper } from "./InMemoryWebScraper";

describe("StockTrackingUseCase", () => {
  let useCase: StockTrackingUseCase;

  beforeAll(() => {
    useCase = new StockTrackingUseCase();
  });

  test("fails to track invalid stock", () => {
    expect(() => {
      return useCase.trackStock("VALE");
    }).rejects.toThrow("Invalid Stock!");
  });

  test("tracks valid stock", async () => {
    const webScraper = Context.webScraper as InMemoryWebScraper;
    webScraper.addStock(new Stock("VALE3"));

    await useCase.trackStock("VALE3");

    expect(await Context.stockGateway.findAll()).toHaveLength(1);
  });

  test("fails to track already tracked stock", async () => {
    await Context.stockGateway.save(new Stock("VALE3"));
    const webScraper = Context.webScraper as InMemoryWebScraper;
    webScraper.addStock(new Stock("VALE3"));

    expect(() => {
      return useCase.trackStock("VALE3");
    }).rejects.toThrow("Existent Stock!");
  });
});
