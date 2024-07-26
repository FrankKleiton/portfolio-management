import { InMemoryDatabaseGateway } from "../tests/doubles/InMemoryDatabaseGateway";
import { Context } from "./Context";
import { StockSummariesController } from "./controllers/stock-summaries/StockSummariesController";
import { StatusInvestWebScraper } from "./gateways/StatusInvestWebScraperGateway";
import { Server } from "./http/Server";
import { StockSummariesPresenter } from "./presenters/stock-summaries/StockSummariesPresenter";
import { StockSummariesUseCase } from "./usecases/stock-summaries/StockSummariesUseCase";
import { StockSummariesViewImpl } from "./views/stock-summaries/StockSummariesViewImpl";

const inMemoryDatabaseGateway = new InMemoryDatabaseGateway();
Context.databaseGateway = inMemoryDatabaseGateway;
Context.webScraperGateway = new StatusInvestWebScraper();
inMemoryDatabaseGateway.saveTicket("VALE3");
inMemoryDatabaseGateway.saveTicket("KEPL3");

const server = new Server();

const stockSummariesUseCase = new StockSummariesUseCase();
const stockSummariesPresenter = new StockSummariesPresenter();
const stockSummariesView = new StockSummariesViewImpl();
const stockSummariesController = new StockSummariesController(
  stockSummariesUseCase,
  stockSummariesPresenter,
  stockSummariesView
);

server.addRoute("get", "/", stockSummariesController);

export { server };
