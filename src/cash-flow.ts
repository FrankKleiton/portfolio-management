export class CashFlow {
  private _operational: number = 0;
  private _investing: number = 0;

  set investing(amount: number) {
    this._investing = amount;
  }

  get investing() {
    return this._investing;
  }

  set operational(amount: number) {
    this._operational = amount;
  }

  get operational() {
    return this._operational;
  }

  get freeCashFlow() {
    return this._operational - this._investing;
  }
}
