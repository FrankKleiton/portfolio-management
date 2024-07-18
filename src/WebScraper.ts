import { Stock } from "./Stock";

export interface WebScraper {
  collectStock(ticket: string): Promise<Stock | undefined>;
}
