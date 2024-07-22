import { Context } from "../../Context";

export class StockTrackingUseCase {
  async trackStock(ticket: string) {
    if (await Context.databaseGateway.findTicket(ticket)) {
      throw new Error("Existent Stock!");
    }

    if (!(await Context.webScraperGateway.collectStock(ticket))) {
      throw new Error("Invalid Stock!");
    }

    await Context.databaseGateway.saveTicket(ticket);
  }
}
