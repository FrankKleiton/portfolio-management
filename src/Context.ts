import { DatabaseGateway } from "./gateways/StockGateway";
import { WebScraperGateway } from "./gateways/WebScraperGateway";

export class Context {
  static DatabaseGateway: DatabaseGateway;
  static webScraper: WebScraperGateway;
}
