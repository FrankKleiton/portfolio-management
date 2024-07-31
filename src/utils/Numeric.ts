export class Numeric {
    public static rates: { [key: string]: number } = {
      M: 1000000,
      B: 1000000000,
    };
  
    public static parse(value: number | string) {
      if (typeof value === "number") {
        return value;
      } else {
        const suffix = value.at(-1);
        if (!suffix || !Object.keys(this.rates).includes(suffix)) {
          return 0;
        }
  
        return (
          Number.parseFloat(value.replace(` ${suffix}`, "").replace(/\,/g, ".")) *
          +this.rates[suffix]
        );
      }
    }
  }