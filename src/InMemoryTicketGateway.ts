import { Ticket } from "./Ticket";
import { TicketGateway } from "./TicketGateway";

export class InMemoryTicketGateway implements TicketGateway {
  private tickets: Ticket[] = [];

  async save(ticket: Ticket): Promise<void> {
    this.tickets.push(ticket);
  }

  async delete(ticket: string): Promise<void> {
    this.tickets = this.tickets.filter((t) => !t.equals(new Ticket(ticket)));
  }

  async findAll(): Promise<Ticket[]> {
    return this.tickets;
  }

  async find(ticket: string): Promise<Ticket | undefined> {
    return this.tickets.find((t) => t.equals(new Ticket(ticket)));
  }
}
