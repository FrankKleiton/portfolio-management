export class Ticket {
  constructor(private value: string) {}

  equals(found: Ticket): boolean {
    return this.value === found?.value;
  }
}
