export class Period {
  constructor(private start: number, private end: number = 0) {}

  get value() {
    return this.start;
  }

  equals(period: Period) {
    return this.start === period.start && this.end === period.end;
  }

  private spread() {
    return Math.abs(this.end - this.start);
  }

  greaterThen(period: Period) {
    return this.spread() > period.spread();
  }
}
