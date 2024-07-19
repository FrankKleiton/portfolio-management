import { Context } from "./Context";
import { Stock } from "./Stock";

export class StockTrackingUseCase {
  async trackStock(ticket: string) {
    let stock = await Context.stockGateway.find(ticket);

    if (stock) {
      throw new Error("Existent Stock!");
    }

    stock = await Context.webScraper.collectStock(ticket);

    if (!stock) {
      throw new Error("Invalid Stock!");
    }

    await Context.stockGateway.save(new Stock(ticket));
  }
}
