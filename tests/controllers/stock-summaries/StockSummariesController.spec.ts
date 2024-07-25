import { StockSummariesController } from "../../../src/controllers/stock-summaries/StockSummariesController";
import { ParsedRequest } from "../../../src/http/ParsedRequest";
import { StockSummariesInputBoundary } from "../../../src/usecases/stock-summaries/StockSummariesInputBoundary";
import { StockSummariesOutputBoundary } from "../../../src/usecases/stock-summaries/StockSummariesOutputBoundary";
import { StockSummariesResponseModel } from "../../../src/usecases/stock-summaries/StockSummariesResponseModel";
import { StockSummariesView } from "../../../src/usecases/stock-summaries/StockSummariesView";
import { StockSummariesViewModel } from "../../../src/usecases/stock-summaries/StockSummariesViewModel";
import { StockSummary } from "../../../src/usecases/stock-summaries/StockSummary";
import { StockSummariesPresenterSpy } from "../../mocks/StockSummariesPresenterSpy";
import { StockSummariesUseCaseSpy } from "../../mocks/StockSummariesUseCaseSpy";

class StockSummariesViewImplSpy implements StockSummariesView {
  private viewModel: StockSummariesViewModel = new StockSummariesViewModel();

  getViewModel(): StockSummariesViewModel {
    return this.viewModel;
  }
  generateView(viewModel: StockSummariesViewModel): string {
    this.viewModel = viewModel;

    return "";
  }
}

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
