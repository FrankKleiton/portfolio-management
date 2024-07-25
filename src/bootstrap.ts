import { StockSummariesController } from "./controllers/stock-summaries/StockSummariesController";
import { Server } from "./http/Server";
import { StockSummariesPresenter } from "./presenters/stock-summaries/StockSummariesPresenter";
import { StockSummariesUseCase } from "./usecases/stock-summaries/StockSummariesUseCase";
import { StockSummariesViewImpl } from "./views/stock-summaries/StockSummariesViewImpl";

const server = new Server();

const stockSummariesUseCase = new StockSummariesUseCase();
const stockSummariesPresenter = new StockSummariesPresenter();
const stockSummariesView = new StockSummariesViewImpl();
const stockSummariesController = new StockSummariesController(
  stockSummariesUseCase,
  stockSummariesPresenter,
  stockSummariesView
);

server.addRoute("get", "/stocks", stockSummariesController);

export { server };
