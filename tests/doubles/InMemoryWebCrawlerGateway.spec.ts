import { Context } from "../../src/Context";
import { Stock } from "../../src/entities/Stock";
import { InMemoryWebScraperGateway } from "./InMemoryWebScraperGateway";

describe("InMemoryWebScraperGateway", () => {
  test("can find stock", async () => {
    const webScraper = Context.webScraperGateway as InMemoryWebScraperGateway;
    webScraper.addStock(new Stock("VALE3"));

    const collected = await webScraper.collectStock("VALE3");
    expect(collected?.equals(new Stock("VALE3"))).toBeTruthy();
  });
});
