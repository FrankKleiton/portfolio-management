export abstract class Period {
  constructor(public start: number, public end: number = 0) {}

  abstract plus(period: Period): Period;

  isCompound() {
    return this.end != 0;
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

  static compound(start: number, end: number) {
    return new CompoundPeriod(start, end);
  }

  static simple(start: number) {
    return new SimplePeriod(start);
  }
}

class SimplePeriod extends Period {
  constructor(public start: number, public end: number = 0) {
    super(start);
  }

  plus(period: Period): Period {
    if (period instanceof CompoundPeriod) {
      let start = 0,
        end = 0;

      if (this.start > period.start) {
        (start = this.start), (end = period.end);
      } else {
        if (this.start < period.end) {
          (start = period.start), (end = this.start);
        } else {
          (start = period.start), (end = period.end);
        }
      }

      return Period.compound(start, end);
    }

    if (this.start == period.start) {
      return Period.simple(this.start);
    } else {
      let start = 0,
        end = 0;

      if (this.start > period.start) {
        (start = this.start), (end = period.start);
      } else {
        (start = period.start), (end = this.start);
      }

      return Period.compound(start, end);
    }
  }
}

class CompoundPeriod extends Period {
  constructor(public start: number, public end: number = 0) {
    super(start, end);
  }

  plus(period: Period): Period {
    let start = 0,
      end = 0;
    if (period instanceof SimplePeriod) {
      if (period.start > this.start) {
        (start = period.start), (end = this.end);
      } else {
        if (period.start < this.end) {
          (start = this.start), (end = period.start);
        } else {
          (start = this.start), (end = this.end);
        }
      }
    }

    return Period.compound(start, end);
  }
}
