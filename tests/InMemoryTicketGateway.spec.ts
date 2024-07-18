import { Context } from "../src/Context";
import { InMemoryTicketGateway } from "./InMemoryTicketGateway";
import { Stock } from "../src/Stock";

describe("InMemoryStockGateway", () => {
  let gateway: InMemoryTicketGateway;
  let stock1: Stock;

  beforeEach(async () => {
    gateway = new InMemoryTicketGateway();
    stock1 = new Stock("Stock1");

    Context.stockGateway = gateway;
    await Context.stockGateway.save(stock1);
    await Context.stockGateway.save(new Stock("Stock2"));
  });

  test("can find stock", async () => {
    const found = await Context.stockGateway.find("Stock1");

    expect(found?.equals(found)).toBeTruthy();
  });

  test("can delete Stock", async () => {
    await Context.stockGateway.delete("Stock1");

    expect(await Context.stockGateway.findAll()).toHaveLength(1);
  });
});
