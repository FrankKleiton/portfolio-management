export class CashFlow {
  private operational: number = 0;
  private investing: number = 0;

  setInvesting(amount: number) {
    this.investing = amount;
  }

  getInvesting() {
    return this.investing;
  }

  setOperational(amount: number) {
    this.operational = amount;
  }

  getOperational() {
    return this.operational;
  }
}
