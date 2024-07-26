import cheerio from "cheerio";

import { Stock } from "../entities/Stock";
import { WebScraperGateway } from "../usecases/WebScraperGateway";

export class StatusInvestWebScraper implements WebScraperGateway {
  async collectStock(ticket: string): Promise<Stock | undefined> {
    const response = await fetch(`https://statusinvest.com.br/acoes/${ticket}`);

    if (!response.ok) {
      return undefined;
    }

    const $ = cheerio.load(await response.text());

    const marketValue = $('a[title="Artigo detalhando Valor de mercado"]')
      .nextAll("strong.value")
      .text()
      .replace(/\./g, "");

    if (!marketValue) {
      return undefined;
    }

    return new Stock(ticket, +marketValue);
  }
}
