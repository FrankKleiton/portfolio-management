import { Stock } from "../../../src/entities/Stock";
import { StockTrackingUseCase } from "../../../src/usecases/stock-tracking/StockTrackingUseCase";
import { inMemoryStockGateway, inMemoryWebScraper } from "../../utils";

describe("StockTrackingUseCase", () => {
  let useCase: StockTrackingUseCase;

  beforeAll(() => {
    useCase = new StockTrackingUseCase();
  });

  describe("given no stocks", () => {
    test("fails to track invalid stock", () => {
      expect(() => {
        return useCase.trackStock("VALE");
      }).rejects.toThrow("Invalid Stock!");
    });
  });

  describe("given one stock", () => {
    beforeAll(() => {
      inMemoryWebScraper().addStock(new Stock("VALE3"));
    });

    test("tracks valid stock", async () => {
      await useCase.trackStock("VALE3");

      expect(await inMemoryStockGateway().findAllTickets()).toHaveLength(1);
    });

    test("fails to track already tracked stock", async () => {
      await inMemoryStockGateway().saveTicket("VALE3");

      expect(() => {
        return useCase.trackStock("VALE3");
      }).rejects.toThrow("Existent Stock!");
    });
  });
});
