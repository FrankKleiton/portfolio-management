export interface DatabaseGateway {
  saveTicket(ticket: string): Promise<void>;
  findAllTickets(): Promise<string[]>;
  findTicket(ticket: string): Promise<string | undefined>;
  deleteTicket(ticket: string): Promise<void>;
}
