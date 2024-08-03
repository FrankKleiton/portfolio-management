import cheerio from "cheerio";
import puppeteer, { Browser } from "puppeteer";

import { Stock } from "../entities/Stock";
import { WebScraperGateway } from "../usecases/WebScraperGateway";
import { CashFlow } from "../entities/CashFlow";
import { Period } from "../entities/Period";
import { Numeric } from "../utils/Numeric";
import { PerformanceValue } from "../entities/PerformanceValue";

async function html(ticket: string) {
  let browser: Browser | null = null;
  let result: string = "";

  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(
      `https://statusinvest.com.br/acoes/${ticket.toLowerCase()}`
    );

    await page.locator("#contabil-section").scroll({
      scrollLeft: 10,
      scrollTop: 20,
    });

    await page.waitForSelector(
      "#contabil-section > div:nth-child(1) > div > div:nth-child(4) > div.scroll > div > table > tbody > tr:nth-child(8) > td:nth-child(2) > span",
      {
        timeout: 40000,
      }
    );

    const pageHtmlSelector = await page.waitForSelector("html");
    const pageHtml = await pageHtmlSelector?.evaluate((s) => s.innerHTML);

    if (pageHtml) {
      result = pageHtml;
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  return result;
}

export class StatusInvestWebScraper implements WebScraperGateway {
  async collectCashFlows(ticket: string): Promise<CashFlow[]> {
    const page = await html(ticket.toLowerCase());

    const $ = cheerio.load(page);

    const trYears = $(
      "#contabil-section > div:nth-child(1) > div > div:nth-child(4) > div.scroll > div > table > thead > tr th"
    );

    let years: number[] = [];
    trYears.each((index, el) => {
      const elHtml = $(el).html() || "";
      if (index % 2 !== 0 && elHtml) {
        years.push(+elHtml);
      }
    });

    const operationalValuesTd = $(
      "#contabil-section > div:nth-child(1) > div > div:nth-child(4) > div.scroll > div > table > tbody > tr:nth-child(1) > td"
    );

    const investingValuesTd = $(
      "#contabil-section > div:nth-child(1) > div > div:nth-child(4) > div.scroll > div > table > tbody > tr:nth-child(7) > td"
    );

    const getTableValues = (elementInstance: cheerio.Cheerio) => {
      const values: string[] = [];
      elementInstance.each((index, td) => {
        if (index != 0 && index % 2 !== 0) {
          const value = $(td).children().html();

          if (value) {
            values.push(value);
          }
        }
      });

      return values;
    };

    const operationalValues = getTableValues(operationalValuesTd);
    const investingValues = getTableValues(investingValuesTd);

    return years.map((value, i) => {
      const period = Period.simple(value);

      return new CashFlow(
        new PerformanceValue(Numeric.parse(operationalValues[i]), period),
        new PerformanceValue(Numeric.parse(investingValues[i]), period)
      );
    });
  }

  async collectStock(ticket: string): Promise<Stock | undefined> {
    const page = await html(ticket.toLowerCase());

    const $ = cheerio.load(page);

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
