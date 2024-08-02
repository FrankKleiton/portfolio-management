import { Context } from "../../../src/Context";
import { Stock } from "../../../src/entities/Stock";
import { StockTrackingUseCase } from "../../../src/usecases/stock-tracking/StockTrackingUseCase";
import { InMemoryDatabaseGateway } from "../../doubles/InMemoryDatabaseGateway";
import { InMemoryWebScraperGateway } from "../../doubles/InMemoryWebScraperGateway";

describe("StockTrackingUseCase", () => {
  let useCase: StockTrackingUseCase;
  let databaseGateway: InMemoryDatabaseGateway;
  let webScraperGateway: InMemoryWebScraperGateway;

  beforeAll(() => {
    useCase = new StockTrackingUseCase();
    databaseGateway = Context.databaseGateway as InMemoryDatabaseGateway;
    webScraperGateway = Context.webScraperGateway as InMemoryWebScraperGateway;
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
      webScraperGateway.addStock(new Stock("VALE3"));
    });

    test("tracks valid stock", async () => {
      await useCase.trackStock("VALE3");

      expect(await databaseGateway.findAllTickets()).toHaveLength(1);
    });

    test("fails to track already tracked stock", async () => {
      await databaseGateway.saveTicket("VALE3");

      expect(() => {
        return useCase.trackStock("VALE3");
      }).rejects.toThrow("Existent Stock!");
    });
  });
});
