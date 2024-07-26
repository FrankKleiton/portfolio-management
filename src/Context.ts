import { DatabaseGateway } from "./usecases/StockGateway";
import { WebScraperGateway } from "./usecases/WebScraperGateway";

export class Context {
  static databaseGateway: DatabaseGateway;
  static webScraperGateway: WebScraperGateway;
}
