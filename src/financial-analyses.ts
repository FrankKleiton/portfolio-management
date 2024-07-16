import { FinancialAnalysis } from "./financial-analysis";

export class FinancialAnalyses {
  private data: FinancialAnalysis[] = [];

  all() {
    return this.data;
  }

  add(financialAnalysis: FinancialAnalysis) {
    this.data.push(financialAnalysis);
  }
}
