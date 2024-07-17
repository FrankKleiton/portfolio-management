import { Ticket } from "./Ticket";

export interface TicketGateway {
  save(ticket: Ticket): Promise<void>;
  findAll(): Promise<Ticket[]>;
  find(ticket: string): Promise<Ticket | undefined>;
  delete(ticket: string): Promise<void>;
}
