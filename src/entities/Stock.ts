export class Stock {
  constructor(
    public ticket: string,
    public marketValue: number = 0,
    public operationalCashFlow: number = 0,
    public investingCashFlow: number = 0
  ) {}

  equals(found?: Stock): boolean {
    return this.ticket === found?.ticket;
  }
}
