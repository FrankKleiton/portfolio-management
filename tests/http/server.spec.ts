import request from "supertest";

import { Stock } from "../../src/entities/Stock";
import { inMemoryDatabaseGateway, inMemoryWebScraperGateway } from "../utils";
import { server } from "../../src/Bootstrap";

describe("Http", () => {
  beforeAll(() => {
    const stock = new Stock("VALE3", 1000, 100, -10);

    inMemoryDatabaseGateway().saveTicket(stock.ticket);
    inMemoryWebScraperGateway().addStock(stock);
  });

  test("get stocks", async () => {
    const response = await request(server.app).get("/");
    expect(response.text).toMatch(/VALE3/);
    expect(response.text).toMatch(/R\$ 1.000,00/);
  });
});
