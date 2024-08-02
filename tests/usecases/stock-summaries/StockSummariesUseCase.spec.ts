import { StockSummariesUseCase } from "../../../src/usecases/stock-summaries/StockSummariesUseCase";
import { Stock } from "../../../src/entities/Stock";
import { StockSummariesPresenterSpy } from "../../mocks/StockSummariesPresenterSpy";
import { Period } from "../../../src/entities/Period";
import { CashFlow } from "../../../src/entities/CashFlow";
import { PerformanceValue } from "../../../src/entities/PerformanceValue";
import { InMemoryDatabaseGateway } from "../../doubles/InMemoryDatabaseGateway";
import { InMemoryWebScraperGateway } from "../../doubles/InMemoryWebScraperGateway";
import { Context } from "../../../src/Context";

describe("StockSummariesUseCase", () => {
  let useCase: StockSummariesUseCase;
  let presenterSpy: StockSummariesPresenterSpy;
  let databaseGateway: InMemoryDatabaseGateway;
  let webScraperGateway: InMemoryWebScraperGateway;

  beforeAll(() => {
    useCase = new StockSummariesUseCase();
    presenterSpy = new StockSummariesPresenterSpy();
    databaseGateway = Context.databaseGateway as InMemoryDatabaseGateway;
    webScraperGateway = Context.webScraperGateway as InMemoryWebScraperGateway;
  });

  beforeEach(() => {
    presenterSpy.clearAll();
  });

  test("usecase wiring", async () => {
    await useCase.summarizeStocks(presenterSpy);

    expect(presenterSpy.responseModel).not.toBeNull();
  });

  describe("given no stock summaries", () => {
    test("none stocks summarized", async () => {
      await useCase.summarizeStocks(presenterSpy);

      expect(presenterSpy.responseModel?.getStockSummaries()).toHaveLength(0);
    });
  });

  describe("given one stock summary", () => {
    beforeEach(async () => {
      const cashFlow = new CashFlow(1000, -100, new Period(2020));
      await databaseGateway.saveTicket("VALE3");
      await webScraperGateway.addStock(new Stock("VALE3", 1000));
      await webScraperGateway.addCashFlow("VALE3", cashFlow);
    });

    test("got correct summary ", async () => {
      await useCase.summarizeStocks(presenterSpy);

      expect(getFirstSummary()).toEqual(
        expect.objectContaining({ marketValue: 1000, ticket: "VALE3" })
      );
    });

    describe("given one cashflow", () => {
      let expected: PerformanceValue;

      beforeAll(async () => {
        expected = new PerformanceValue(900, new Period(2020));
      });

      beforeEach(async () => {
        await useCase.summarizeStocks(presenterSpy);
      });

      test("got correct free cash flow", async () => {
        expect(getFirstCashFlow()?.equals(expected)).toBeTruthy();
      });

      test("last free cash flow is an average", () => {
        expect(getLastCashFlow()?.equals(expected)).toBeTruthy();
      });
    });

    describe("given multiple cashflows", () => {
      beforeEach(async () => {
        const nineHundred = new CashFlow(1000, -100, new Period(2021));
        const nineThousand = new CashFlow(10000, -1000, new Period(2022));
        await webScraperGateway.addCashFlow("VALE3", nineHundred);
        await webScraperGateway.addCashFlow("VALE3", nineThousand);
      });

      test("last cashflow equals average free cash flow", async () => {
        await useCase.summarizeStocks(presenterSpy);

        const expected = new PerformanceValue(3600, new Period(2022, 2020));

        expect(getLastCashFlow()?.equals(expected)).toBeTruthy();
      });
    });

    const getFirstSummary = () => {
      const summaries = presenterSpy.responseModel?.getStockSummaries();
      return summaries?.at(0);
    };

    const getFirstCashFlow = () => {
      return getFirstSummary()?.freeCashFlows?.at(0);
    };

    const getLastCashFlow = () => {
      return getFirstSummary()?.freeCashFlows?.at(-1);
    };
  });
});
