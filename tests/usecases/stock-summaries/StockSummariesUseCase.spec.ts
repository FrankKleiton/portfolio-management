import { StockSummariesUseCase } from "../../../src/usecases/stock-summaries/StockSummariesUseCase";
import { Stock } from "../../../src/entities/Stock";
import {
  inMemoryDatabaseGateway,
  inMemoryWebScraperGateway,
} from "../../utils";
import { StockSummariesPresenterSpy } from "../../mocks/StockSummariesPresenterSpy";
import { Period } from "../../../src/entities/Period";
import { CashFlow } from "../../../src/entities/CashFlow";
import { PerformanceValue } from "../../../src/entities/PerformanceValue";

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
      beforeEach(async () => {
        await inMemoryDatabaseGateway().saveTicket("VALE3");
        await inMemoryWebScraperGateway().addStock(new Stock("VALE3", 1000));
        await inMemoryWebScraperGateway().addCashFlow(
          "VALE3",
          new CashFlow(1000, -100, new Period(2020))
        );
      });
      test("one stock is presented", async () => {
        await useCase.summarizeStocks(presenterSpy);

        const summaries = presenterSpy.responseModel?.getStockSummaries();
        const summary = summaries?.at(0);
        const firstValue = summary?.freeCashFlows?.at(0);
        const lastValue = summary?.freeCashFlows?.at(1);

        const expected = new PerformanceValue(900, new Period(2020));

        expect(summaries).toHaveLength(1);
        expect(summary?.marketValue).toBe(1000);
        expect(summary?.ticket).toBe("VALE3");
        expect(firstValue?.equals(expected)).toBeTruthy();
        expect(lastValue?.equals(expected)).toBeTruthy();
      });

      test("average free cash flow", async () => {
        await inMemoryWebScraperGateway().addCashFlow(
          "VALE3",
          new CashFlow(1000, -100, new Period(2021))
        );
        await inMemoryWebScraperGateway().addCashFlow(
          "VALE3",
          new CashFlow(10000, -1000, new Period(2022))
        );
        await useCase.summarizeStocks(presenterSpy);

        const summaries = presenterSpy.responseModel?.getStockSummaries();
        const summary = summaries?.at(0);
        const lastValue = summary?.freeCashFlows?.at(-1);

        const expected = new PerformanceValue(3600, new Period(2022, 2020));

        expect(lastValue?.equals(expected)).toBeTruthy();
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
          new CashFlow(1000, 100, new Period(2021))
        );
        expect(await useCase.getOrderedCashFlows("VALE3")).toHaveLength(1);
      });
    });

    describe("given more than one cashflow", () => {
      beforeEach(() => {
        inMemoryWebScraperGateway().addCashFlow(
          "VALE3",
          new CashFlow(1000, -100, new Period(2021))
        );
        inMemoryWebScraperGateway().addCashFlow(
          "VALE3",
          new CashFlow(2000, -200, new Period(2020))
        );
      });
      test("sort by period", async () => {
        const cashFlows = await useCase.getOrderedCashFlows("VALE3");
        expect(cashFlows.at(0)?.period.equals(new Period(2021))).toBeTruthy();
      });
    });
  });

  describe("period", () => {
    let twentyOne: Period;
    let twentyTwo: Period;
    let twentyOneToTwentyFour: Period;

    beforeAll(() => {
      twentyOne = new Period(2021);
      twentyTwo = new Period(2022);
      twentyOneToTwentyFour = new Period(2021, 2024);
    });

    test("year equality", () => {
      expect(twentyOne.equals(twentyOne)).toBeTruthy();
      expect(twentyOne.equals(twentyOne)).toBeTruthy();
      expect(twentyOne.equals(twentyTwo)).toBeFalsy();
      expect(twentyOneToTwentyFour.equals(twentyOne)).toBeFalsy();
      expect(twentyOneToTwentyFour.equals(twentyOneToTwentyFour)).toBeTruthy();
    });

    test("year greater than", () => {
      expect(twentyOne.greaterThen(twentyTwo)).toBeFalsy();
      expect(
        twentyOneToTwentyFour.greaterThen(new Period(2021, 2021))
      ).toBeTruthy();

      expect(
        twentyOneToTwentyFour.greaterThen(new Period(2021, 2025))
      ).toBeFalsy();
      expect(twentyOneToTwentyFour.greaterThen(twentyOne)).toBeFalsy();
    });
  });
});
