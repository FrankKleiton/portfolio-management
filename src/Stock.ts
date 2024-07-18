export class Stock {
  constructor(private value: string) {}

  equals(found: Stock): boolean {
    return this.value === found?.value;
  }
}
