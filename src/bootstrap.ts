import { InMemoryDatabaseGateway } from "../tests/doubles/InMemoryDatabaseGateway";
import { InMemoryWebScraperGateway } from "../tests/doubles/InMemoryWebScraperGateway";
import { Context } from "./Context";
import { StockSummariesController } from "./controllers/stock-summaries/StockSummariesController";
import { Stock } from "./entities/Stock";
import { Server } from "./http/Server";
import { StockSummariesPresenter } from "./presenters/stock-summaries/StockSummariesPresenter";
import { StockSummariesUseCase } from "./usecases/stock-summaries/StockSummariesUseCase";
import { StockSummariesViewImpl } from "./views/stock-summaries/StockSummariesViewImpl";

const inMemoryDatabaseGateway = new InMemoryDatabaseGateway();
const inMemoryWebScraperGateway = new InMemoryWebScraperGateway();
Context.databaseGateway = inMemoryDatabaseGateway;
Context.webScraperGateway = inMemoryWebScraperGateway;
inMemoryDatabaseGateway.saveTicket("VALE3");
inMemoryDatabaseGateway.saveTicket("KEPL3");

inMemoryWebScraperGateway.addStock(new Stock("VALE3", 1000000000));
inMemoryWebScraperGateway.addStock(new Stock("KEPL3", 100000000));

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
