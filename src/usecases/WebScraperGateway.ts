import { CashFlow } from "../entities/CashFlow";
import { Stock } from "../entities/Stock";

export interface WebScraperGateway {
  collectCashFlows(ticket: string): Promise<CashFlow[]>;
  collectStock(ticket: string): Promise<Stock | undefined>;
}
