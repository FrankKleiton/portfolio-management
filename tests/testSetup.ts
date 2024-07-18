import { Context } from "../src/Context";
import { InMemoryStockGateway } from "./InMemoryStockGateway";
import { InMemoryWebScraper } from "./InMemoryWebScraper";

beforeAll(() => {
  Context.stockGateway = new InMemoryStockGateway();
  Context.webScraper = new InMemoryWebScraper();
});

afterEach(() => {
  const stockGateway = Context.stockGateway as InMemoryStockGateway;
  const webScraper = Context.webScraper as InMemoryWebScraper;

  stockGateway.clearAll();
  webScraper.clearAll();
});
