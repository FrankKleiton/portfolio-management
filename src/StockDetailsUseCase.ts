import { Context } from "./Context";
import { PresentableStock } from "./PresentableStock";
import { Stock } from "./Stock";

export class StockDetailsUseCase {
  public static SimpleCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  async detailStocks(): Promise<PresentableStock[]> {
    const stored = await Context.stockGateway.findAll();

    const presentableStocks = [];

    for (const storedStock of stored) {
      const stock = await Context.webScraper.collectStock(storedStock.ticket);

      if (stock) {
        presentableStocks.push(this.formatStock(stock));
      }
    }
    return presentableStocks;
  }

  private formatStock(stock: Stock) {
    const presentableStock = new PresentableStock();
    this.doFormatStock(presentableStock, stock);
    return presentableStock;
  }

  private doFormatStock(presentableStock: PresentableStock, stock: Stock) {
    presentableStock.marketValue =
      StockDetailsUseCase.SimpleCurrencyFormatter.format(stock.marketValue);
    presentableStock.ticket = stock.ticket;
  }
}
