import { StockSummariesUseCase } from "../../../src/usecases/stock-summaries/StockSummariesUseCase";
import { Stock } from "../../../src/entities/Stock";
import {
  inMemoryDatabaseGateway,
  inMemoryWebScraperGateway,
} from "../../utils";
import { StockSummariesPresenterSpy } from "../../mocks/StockSummariesPresenterSpy";
import { Year } from "../../../src/entities/Year";
import { CashFlow } from "../../../src/entities/CashFlow";

describe("StockSummariesUseCase", () => {
  let useCase: StockSummariesUseCase;
  let presenterSpy: StockSummariesPresenterSpy;

  beforeAll(() => {
    useCase = new StockSummariesUseCase();
    presenterSpy = new StockSummariesPresenterSpy();
  });

  beforeEach(() => {
    presenterSpy.clearAll();
  });

  describe("summarizeStocks", () => {
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
        expect(summaries?.at(0)?.ticket).toBe("VALE3");
      });
    });
  });

  describe("getOrderedCashFlows", () => {
    describe("given no cash flows", () => {
      test("got none cashflows", async () => {
        expect(await useCase.getOrderedCashFlows("VALE3")).toHaveLength(0);
      });
    });

    describe("given one cashflow", () => {
      test("got one cashflow", async () => {
        inMemoryWebScraperGateway().addCashFlow(
          "VALE3",
          new CashFlow(1000, 100, new Year(2021))
        );
        expect(await useCase.getOrderedCashFlows("VALE3")).toHaveLength(1);
      });
    });

    describe("given more than one cashflow", () => {
      beforeEach(() => {
        inMemoryWebScraperGateway().addCashFlow(
          "VALE3",
          new CashFlow(1000, -100, new Year(2021))
        );
        inMemoryWebScraperGateway().addCashFlow(
          "VALE3",
          new CashFlow(2000, -200, new Year(2020))
        );
      });
      test("sort by year", async () => {
        const cashFlows = await useCase.getOrderedCashFlows("VALE3");
        expect(cashFlows.at(0)?.getYear().equals(new Year(2020))).toBeTruthy();
      });

      test("calculate free cash flow", async () => {
        const cashFlows = await useCase.getOrderedCashFlows("VALE3");
        expect(cashFlows.at(0)?.freeCashFlow).toBe(1800);
        expect(cashFlows.at(1)?.freeCashFlow).toBe(900);
      });
    });
  });

  describe("year", () => {
    let twentyOne: Year;
    let twentyTwo: Year;

    beforeAll(() => {
      twentyOne = new Year(2021);
      twentyTwo = new Year(2022);
    });

    test("year equality", () => {
      expect(twentyOne.equals(twentyOne)).toBeTruthy();
      expect(twentyOne.equals(twentyTwo)).toBeFalsy();
    });

    test("year greater than", () => {
      expect(twentyOne.greaterThen(twentyTwo)).toBeFalsy();
    });
  });
});
