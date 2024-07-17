import { AverageCashFlow } from "./average-cash-flow";
import { Company } from "./company";
import { FinancialAnalysis } from "./financial-analysis";

export class Portfolio {
  private _companies: Map<string, Company> = new Map();

  get companies() {
    return Array.from(this._companies.values());
  }

  addCompany(company: Company) {
    this._companies.set(company.ticket, company);
  }

  buildFinancialAnalysis(company: Company) {
    for (const cashFlow of company.cashFlows.toList()) {
      const analysis = new FinancialAnalysis(cashFlow.year);

      analysis.freeCashFlowYield =
        (cashFlow.freeCashFlow / company.marketValue) * 100;

      company.financialAnalyses.add(analysis);
    }
  }

  buildAverageCashFlow(company: Company) {
    let total = new AverageCashFlow(0, 0);

    for (let c of company.cashFlows.toList()) {
      total = total.plus(c);
    }

    const average = total.divide(company.cashFlows.length());

    company.cashFlows.add(average);
  }
}
