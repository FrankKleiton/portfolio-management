import { Stock } from "./Stock";

export interface StockGateway {
  save(ticket: Stock): Promise<void>;
  findAll(): Promise<Stock[]>;
  find(ticket: string): Promise<Stock | undefined>;
  delete(ticket: string): Promise<void>;
}
