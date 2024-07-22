import { Context } from "../src/Context";
import { InMemoryStockGateway } from "./InMemoryStockGateway";
import { InMemoryWebScraper } from "./InMemoryWebScraper";

export function inMemoryStockGateway() {
  return Context.stockGateway as InMemoryStockGateway;
}

export function inMemoryWebScraper() {
  return Context.webScraper as InMemoryWebScraper;
}
