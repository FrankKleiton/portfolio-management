import { Stock } from "../../src/entities/Stock";
import { inMemoryWebScraperGateway } from "../utils";

describe("InMemoryWebScraperGateway", () => {
  test("can find stock", async () => {
    inMemoryWebScraperGateway().addStock(new Stock("VALE3"));

    const collected = await inMemoryWebScraperGateway().collectStock("VALE3");
    expect(collected?.equals(new Stock("VALE3"))).toBeTruthy();
  });
});
