import { StockSummariesController } from "../../../src/controllers/stock-summaries/StockSummariesController";
import { ParsedRequest } from "../../../src/http/ParsedRequest";
import { StockSummariesResponseModel } from "../../../src/usecases/stock-summaries/StockSummariesResponseModel";
import { StockSummary } from "../../../src/usecases/stock-summaries/StockSummary";
import { StockSummariesPresenterSpy } from "../../mocks/StockSummariesPresenterSpy";
import { StockSummariesUseCaseSpy } from "../../mocks/StockSummariesUseCaseSpy";
import { StockSummariesViewImplSpy } from "../../mocks/StockSummariesViewImplSpy";

describe("StockSummariesController", () => {
  let useCase: StockSummariesUseCaseSpy;
  let presenter: StockSummariesPresenterSpy;
  let controller: StockSummariesController;
  let view: StockSummariesViewImplSpy;

  beforeEach(() => {
    const responseModel = new StockSummariesResponseModel();
    responseModel.addStockSummary(new StockSummary());
    responseModel.addStockSummary(new StockSummary());
    responseModel.addStockSummary(new StockSummary());

    useCase = new StockSummariesUseCaseSpy();
    useCase.responseModel = responseModel;

    presenter = new StockSummariesPresenterSpy();
    view = new StockSummariesViewImplSpy();
    controller = new StockSummariesController(useCase, presenter, view);
  });
  test("usecase boundary", async () => {
    const request = new ParsedRequest();

    await controller.handle(request);

    expect(useCase.wasExecuted).toBeTruthy();
  });

  test("presenter boundary", async () => {
    const request = new ParsedRequest();

    await controller.handle(request);

    expect(presenter.getViewModel()?.getViewableStockSummaries()).toHaveLength(
      3
    );
  });

  test("view boundary", async () => {
    const request = new ParsedRequest();

    const result = await controller.handle(request);

    expect(result).toBe("");
    expect(presenter.getViewModel()).toBe(view.getViewModel());
  });
});
