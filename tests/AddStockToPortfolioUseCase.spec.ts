import { Context } from "../src/Context";
import { Stock } from "../src/Stock";
import { InMemoryWebScraper } from "./InMemoryWebScraper";

class AddStockToPortfolioUseCase {
  async addStock(ticket: string) {
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

describe("AddStockToPortfolioUseCase", () => {
  let useCase: AddStockToPortfolioUseCase;

  beforeAll(() => {
    useCase = new AddStockToPortfolioUseCase();
  });

  test("fails to save invalid stock", () => {
    expect(() => {
      return useCase.addStock("VALE");
    }).rejects.toThrow("Invalid Stock!");
  });

  test("saves valid stock", async () => {
    const webScraper = Context.webScraper as InMemoryWebScraper;
    webScraper.addStock(new Stock("VALE3"));

    await useCase.addStock("VALE3");

    expect(await Context.stockGateway.findAll()).toHaveLength(1);
  });

  test("fails to save existent stock", async () => {
    await Context.stockGateway.save(new Stock("VALE3"));
    const webScraper = Context.webScraper as InMemoryWebScraper;
    webScraper.addStock(new Stock("VALE3"));

    expect(() => {
      return useCase.addStock("VALE3");
    }).rejects.toThrow("Existent Stock!");
  });
});
