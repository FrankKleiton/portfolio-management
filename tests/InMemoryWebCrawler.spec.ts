import { Context } from "../src/Context";
import { InMemoryWebScraper } from "./InMemoryWebScraper";
import { Stock } from "../src/Stock";

describe("InMemoryWebScraper", () => {
  test("can find stock", async () => {
    const webScrapper = Context.webScraper as InMemoryWebScraper;
    webScrapper.addStock(new Stock("VALE3"));

    const collected = await Context.webScraper.collectStock("VALE3");
    expect(collected?.equals(new Stock("VALE3"))).toBeTruthy();
  });
});
