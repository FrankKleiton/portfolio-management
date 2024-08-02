import { Context } from "../../src/Context";
import { InMemoryDatabaseGateway } from "./InMemoryDatabaseGateway";

describe("InMemoryDatabaseGateway", () => {
  let databaseGateway: InMemoryDatabaseGateway;

  beforeEach(async () => {
    databaseGateway = Context.databaseGateway as InMemoryDatabaseGateway;

    await databaseGateway.saveTicket("Stock1");
    await databaseGateway.saveTicket("Stock2");
  });

  test("can find stock", async () => {
    const found = await databaseGateway.findTicket("Stock1");

    expect("Stock1" === found).toBeTruthy();
  });

  test("can delete Stock", async () => {
    await databaseGateway.deleteTicket("Stock1");

    expect(await databaseGateway.findAllTickets()).toHaveLength(1);
  });
});
