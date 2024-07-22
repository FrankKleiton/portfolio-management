import { inMemoryStockGateway } from "./utils";

describe("InMemoryStockGateway", () => {
  beforeEach(async () => {
    await inMemoryStockGateway().saveTicket("Stock1");
    await inMemoryStockGateway().saveTicket("Stock2");
  });

  test("can find stock", async () => {
    const found = await inMemoryStockGateway().findTicket("Stock1");

    expect("Stock1" === found).toBeTruthy();
  });

  test("can delete Stock", async () => {
    await inMemoryStockGateway().deleteTicket("Stock1");

    expect(await inMemoryStockGateway().findAllTickets()).toHaveLength(1);
  });
});
