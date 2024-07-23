import { StockSummariesUseCase } from "../../../src/usecases/stock-summaries/StockSummariesUseCase";
import { Stock } from "../../../src/entities/Stock";
import {
  inMemoryDatabaseGateway,
  inMemoryWebScraperGateway,
} from "../../utils";
import { StockSummariesOutputBoundary } from "../../../src/usecases/stock-summaries/StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "../../../src/usecases/stock-summaries/StockSummariesResponseModel";
import { StockSummariesViewModel } from "../../../src/usecases/stock-summaries/StockSummariesViewModel";

class StockSummariesPresenterSpy implements StockSummariesOutputBoundary {
  getViewModel(): StockSummariesViewModel | null {
    throw new Error("Method not implemented.");
  }
  public responseModel: StockSummariesResponseModel | null = null;

  present(responseModel: StockSummariesResponseModel) {
    this.responseModel = responseModel;
  }
}

describe("StockSummariesUseCase", () => {
  let useCase: StockSummariesUseCase;
  let presenterSpy: StockSummariesPresenterSpy;

  beforeEach(() => {
    useCase = new StockSummariesUseCase();
    presenterSpy = new StockSummariesPresenterSpy();
  });

  test("usecase wiring", async () => {
    await useCase.summarizeStocks(presenterSpy);

    expect(presenterSpy.responseModel).not.toBeNull();
  });

  describe("given no stock summaries", () => {
    test("none stocks presented", async () => {
      await useCase.summarizeStocks(presenterSpy);

      expect(presenterSpy.responseModel?.getStockSummaries()).toHaveLength(0);
    });
  });

  describe("given one stock summaries", () => {
    test("one stock is presented", async () => {
      await inMemoryDatabaseGateway().saveTicket("VALE3");
      await inMemoryWebScraperGateway().addStock(
        new Stock("VALE3", 1000, 100, -10)
      );
      await useCase.summarizeStocks(presenterSpy);

      const summaries = presenterSpy.responseModel?.getStockSummaries();
      expect(summaries).toHaveLength(1);
      expect(summaries?.at(0)?.marketValue).toBe(1000);
      expect(summaries?.at(0)?.freeCashFlow).toBe(90);
      expect(summaries?.at(0)?.freeCashFlowYield).toBe(0.09);
      expect(summaries?.at(0)?.ticket).toBe("VALE3");
    });
  });
});
