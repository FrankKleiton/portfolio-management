import { DatabaseGateway } from "./StockGateway";
import { WebScraper } from "./WebScraper";

export class Context {
  static stockGateway: DatabaseGateway;
  static webScraper: WebScraper;
}
