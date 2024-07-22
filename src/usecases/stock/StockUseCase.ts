import { Context } from "../../Context";
import { StockOutputBoundary } from "./StockOutputBoundary";
import { StockResponseModel } from "./StockResponseModel";

export class StockUseCase {
  async detailStocks(presenter: StockOutputBoundary): Promise<void> {
    const responseModel = new StockResponseModel();
    const tickets = await Context.DatabaseGateway.findAllTickets();

    for (const ticket of tickets) {
      const stock = await Context.webScraper.collectStock(ticket);

      if (stock) {
        responseModel.addStockDetail(stock);
      }
    }

    presenter.present(responseModel);
  }
}
