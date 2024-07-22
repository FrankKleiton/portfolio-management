import { Context } from "../src/Context";
import { InMemoryStockGateway } from "./doubles/InMemoryStockGateway";
import { InMemoryWebScraperGateway } from "./doubles/InMemoryWebScraperGateway";

beforeAll(() => {
  Context.DatabaseGateway = new InMemoryStockGateway();
  Context.webScraper = new InMemoryWebScraperGateway();
});

afterEach(() => {
  const stockGateway = Context.DatabaseGateway as InMemoryStockGateway;
  const webScraper = Context.webScraper as InMemoryWebScraperGateway;

  stockGateway.clearAll();
  webScraper.clearAll();
});
