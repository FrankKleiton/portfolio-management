import { StockSummariesController } from "../../../src/controllers/stock-summaries/StockSummariesController";
import { Request } from "../../../src/http/Request";
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
  let result: string;

  beforeEach(async () => {
    const responseModel = new StockSummariesResponseModel();
    responseModel.addStockSummary(new StockSummary());
    responseModel.addStockSummary(new StockSummary());
    responseModel.addStockSummary(new StockSummary());

    useCase = new StockSummariesUseCaseSpy();
    useCase.responseModel = responseModel;

    presenter = new StockSummariesPresenterSpy();
    view = new StockSummariesViewImplSpy();
    controller = new StockSummariesController(useCase, presenter, view);

    result = await controller.handle(new Request());
  });
  test("usecase boundary", async () => {
    expect(useCase.wasExecuted).toBeTruthy();
  });

  test("presenter boundary", async () => {
    expect(presenter.getViewModel()?.getFormattedStockSummaries()).toHaveLength(
      3
    );
  });

  test("view boundary", async () => {
    expect(result).toBe("");
    expect(presenter.getViewModel()).toBe(view.getViewModel());
  });
});
