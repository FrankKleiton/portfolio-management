import { Context } from "../src/Context";
import { InMemoryStockGateway } from "./doubles/InMemoryStockGateway";
import { InMemoryWebScraperGateway } from "./doubles/InMemoryWebScraperGateway";

export function inMemoryStockGateway() {
  return Context.DatabaseGateway as InMemoryStockGateway;
}

export function inMemoryWebScraper() {
  return Context.webScraper as InMemoryWebScraperGateway;
}
