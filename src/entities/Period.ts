export class Period {
  constructor(public start: number, public end: number = 0) {}

  plus(period: Period): Period {
    return new Period(this.start, period.start);
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
