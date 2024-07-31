import { Context } from "../src/Context";
import { InMemoryDatabaseGateway } from "./doubles/InMemoryDatabaseGateway";
import { InMemoryWebScraperGateway } from "./doubles/InMemoryWebScraperGateway";

jest.setTimeout(60000);
beforeAll(() => {
  Context.databaseGateway = new InMemoryDatabaseGateway();
  Context.webScraperGateway = new InMemoryWebScraperGateway();
});

afterEach(() => {
  const stockGateway = Context.databaseGateway as InMemoryDatabaseGateway;
  const webScraper = Context.webScraperGateway as InMemoryWebScraperGateway;

  stockGateway.clearAll();

  if (webScraper.clearAll) {
    webScraper.clearAll();
  }
});
