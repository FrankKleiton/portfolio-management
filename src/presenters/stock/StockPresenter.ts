import { Stock } from "../../entities/Stock";
import { StockOutputBoundary } from "../../usecases/stock/StockOutputBoundary";
import { StockResponseModel } from "../../usecases/stock/StockResponseModel";
import {
  StockViewModel,
  ViewableStock,
} from "../../usecases/stock/StockViewModel";

export class StockPresenter implements StockOutputBoundary {
  static format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format;

  private viewModel: StockViewModel | null = null;

  getViewModel(): StockViewModel | null {
    return this.viewModel;
  }

  present(responseModel: StockResponseModel): void {
    this.viewModel = new StockViewModel();

    for (let stock of responseModel.getStocks()) {
      this.viewModel.addModel(this.makeViewableStock(stock));
    }
  }

  makeViewableStock(stock: Stock): ViewableStock {
    const viewableStock = new ViewableStock();
    viewableStock.ticket = stock.ticket;
    viewableStock.marketValue = StockPresenter.format(
      stock.marketValue
    ).replace(/\s/g, " ");
    return viewableStock;
  }
}
