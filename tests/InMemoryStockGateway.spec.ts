import { Stock } from "../src/Stock";
import { inMemoryStockGateway } from "./utils";

describe("InMemoryStockGateway", () => {
  let stock1: Stock;

  beforeEach(async () => {
    stock1 = new Stock("Stock1");

    await inMemoryStockGateway().save(stock1);
    await inMemoryStockGateway().save(new Stock("Stock2"));
  });

  test("can find stock", async () => {
    const found = await inMemoryStockGateway().find("Stock1");

    expect(found?.equals(found)).toBeTruthy();
  });

  test("can delete Stock", async () => {
    await inMemoryStockGateway().delete("Stock1");

    expect(await inMemoryStockGateway().findAll()).toHaveLength(1);
  });
});
