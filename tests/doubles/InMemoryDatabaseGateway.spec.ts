import { inMemoryDatabaseGateway } from "../utils";

describe("InMemoryDatabaseGateway", () => {
  beforeEach(async () => {
    await inMemoryDatabaseGateway().saveTicket("Stock1");
    await inMemoryDatabaseGateway().saveTicket("Stock2");
  });

  test("can find stock", async () => {
    const found = await inMemoryDatabaseGateway().findTicket("Stock1");

    expect("Stock1" === found).toBeTruthy();
  });

  test("can delete Stock", async () => {
    await inMemoryDatabaseGateway().deleteTicket("Stock1");

    expect(await inMemoryDatabaseGateway().findAllTickets()).toHaveLength(1);
  });
});
