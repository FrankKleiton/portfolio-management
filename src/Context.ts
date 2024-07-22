import { DatabaseGateway } from "./gateways/StockGateway";
import { WebScraperGateway } from "./gateways/WebScraperGateway";

export class Context {
  static databaseGateway: DatabaseGateway;
  static webScraperGateway: WebScraperGateway;
}
