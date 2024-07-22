import { Stock } from "../entities/Stock";

export interface WebScraperGateway {
  collectStock(ticket: string): Promise<Stock | undefined>;
}
