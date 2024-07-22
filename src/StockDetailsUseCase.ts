import { Context } from "./Context";
import { StockDetailsOutputBoundary } from "./StockDetailsOutputBoundary";
import { StockDetailsResponseModel } from "./StockDetailsResponseModel";

export class StockDetailsUseCase {
  async detailStocks(presenter: StockDetailsOutputBoundary): Promise<void> {
    const responseModel = new StockDetailsResponseModel();
    const tickets = await Context.stockGateway.findAllTickets();

    for (const ticket of tickets) {
      const stock = await Context.webScraper.collectStock(ticket);

      if (stock) {
        responseModel.addStockDetail(stock);
      }
    }

    presenter.present(responseModel);
  }
}
