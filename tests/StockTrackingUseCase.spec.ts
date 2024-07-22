import { StockTrackingUseCase } from "../src/StockTrackingUseCase";
import { Stock } from "../src/Stock";
import { inMemoryStockGateway, inMemoryWebScraper } from "./utils";

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
    const webScraper = inMemoryWebScraper();
    webScraper.addStock(new Stock("VALE3"));

    await useCase.trackStock("VALE3");

    expect(await inMemoryStockGateway().findAll()).toHaveLength(1);
  });

  test("fails to track already tracked stock", async () => {
    await inMemoryStockGateway().save(new Stock("VALE3"));
    inMemoryWebScraper().addStock(new Stock("VALE3"));

    expect(() => {
      return useCase.trackStock("VALE3");
    }).rejects.toThrow("Existent Stock!");
  });
});