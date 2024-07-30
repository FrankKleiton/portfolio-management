export class Year {
  constructor(public value: number) {}

  equals(year: Year) {
    return this.value === year.value;
  }

  greaterThen(year: Year) {
    return this.value > year.value;
  }
}
