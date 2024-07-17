export abstract class Statement {
  constructor(public year?: number) {}

  sameYear(statement: Statement) {
    return this.year === statement.year;
  }

  equals(statement: Statement) {
    const keys = Object.keys(this) as (keyof Statement)[];

    for (const key of keys) {
      if (this[key] !== statement[key]) {
        return false;
      }
    }

    return true;
  }
}
