import { BalanceSheets } from "./balance-sheets";
import { CashFlows } from "./cash-flows";
import { FinancialAnalyses } from "./financial-analyses";
import { FinancialAnalysis } from "./financial-analysis";

export class Company {
  public cashFlows = new CashFlows();
  public balanceSheets = new BalanceSheets();
  public financialAnalyses = new FinancialAnalyses();

  constructor(public name: string, public marketValue: number) {}
}
