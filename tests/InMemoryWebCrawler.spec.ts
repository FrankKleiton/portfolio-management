import { Stock } from "../src/Stock";
import { inMemoryWebScraper } from "./utils";

describe("InMemoryWebScraper", () => {
  test("can find stock", async () => {
    inMemoryWebScraper().addStock(new Stock("VALE3"));

    const collected = await inMemoryWebScraper().collectStock("VALE3");
    expect(collected?.equals(new Stock("VALE3"))).toBeTruthy();
  });
});
