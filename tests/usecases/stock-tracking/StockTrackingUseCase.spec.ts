import { Stock } from "../../../src/entities/Stock";
import { StockTrackingUseCase } from "../../../src/usecases/stock-tracking/StockTrackingUseCase";
import { inMemoryStockGateway, inMemoryWebScraper } from "../../utils";

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
    inMemoryWebScraper().addStock(new Stock("VALE3"));

    await useCase.trackStock("VALE3");

    expect(await inMemoryStockGateway().findAllTickets()).toHaveLength(1);
  });

  test("fails to track already tracked stock", async () => {
    await inMemoryStockGateway().saveTicket("VALE3");
    inMemoryWebScraper().addStock(new Stock("VALE3"));

    expect(() => {
      return useCase.trackStock("VALE3");
    }).rejects.toThrow("Existent Stock!");
  });
});
