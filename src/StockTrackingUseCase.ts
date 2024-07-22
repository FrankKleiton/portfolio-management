import { Context } from "./Context";

export class StockTrackingUseCase {
  async trackStock(ticket: string) {
    if (await Context.stockGateway.findTicket(ticket)) {
      throw new Error("Existent Stock!");
    }

    if (!(await Context.webScraper.collectStock(ticket))) {
      throw new Error("Invalid Stock!");
    }

    await Context.stockGateway.saveTicket(ticket);
  }
}
