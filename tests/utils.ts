import { Context } from "../src/Context";
import { InMemoryDatabaseGateway } from "./doubles/InMemoryDatabaseGateway";
import { InMemoryWebScraperGateway } from "./doubles/InMemoryWebScraperGateway";

export function inMemoryDatabaseGateway() {
  return Context.databaseGateway as InMemoryDatabaseGateway;
}

export function inMemoryWebScraperGateway() {
  return Context.webScraperGateway as InMemoryWebScraperGateway;
}
