import request from "supertest";

import { Stock } from "../../src/entities/Stock";
import { server } from "../../src/Bootstrap";
import { InMemoryWebScraperGateway } from "../doubles/InMemoryWebScraperGateway";
import { InMemoryDatabaseGateway } from "../doubles/InMemoryDatabaseGateway";
import { Context } from "../../src/Context";

describe.skip("Http", () => {
  let webScraperGateway: InMemoryWebScraperGateway;
  let databaseGateway: InMemoryDatabaseGateway;

  beforeAll(() => {
    webScraperGateway = Context.webScraperGateway as InMemoryWebScraperGateway;
    databaseGateway = Context.databaseGateway as InMemoryDatabaseGateway;

    const stock = new Stock("VALE3", 1000);

    databaseGateway.saveTicket(stock.ticket);
    webScraperGateway.addStock(stock);
  });

  test("get stocks", async () => {
    const response = await request(server.app).get("/");
    expect(response.text).toMatch(/VALE3/);
    expect(response.text).toMatch(/R\$ 1.000,00/);
  });
});
