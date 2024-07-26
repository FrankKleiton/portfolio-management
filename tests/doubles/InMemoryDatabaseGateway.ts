import { DatabaseGateway } from "../../src/usecases/StockGateway";

export class InMemoryDatabaseGateway implements DatabaseGateway {
  private tickets: string[] = [];

  async saveTicket(ticket: string): Promise<void> {
    this.tickets.push(ticket);
  }

  async deleteTicket(ticket: string): Promise<void> {
    this.tickets = this.tickets.filter((t) => t !== ticket);
  }

  async findAllTickets(): Promise<string[]> {
    return this.tickets;
  }

  async findTicket(ticket: string): Promise<string | undefined> {
    return this.tickets.find((t) => t === ticket);
  }

  clearAll() {
    this.tickets = [];
  }
}
