import { InMemoryTicketGateway } from "../src/InMemoryTicketGateway";
import { Ticket } from "../src/Ticket";
import { TicketGateway } from "../src/TicketGateway";

class Context {
  static ticketGateway: TicketGateway;
}

describe("InMemoryTicketGateway", () => {
  let gateway: InMemoryTicketGateway;
  let ticket1: Ticket;

  beforeEach(async () => {
    gateway = new InMemoryTicketGateway();
    Context.ticketGateway = gateway;

    ticket1 = new Ticket("Ticket1");

    await Context.ticketGateway.save(ticket1);
    await Context.ticketGateway.save(new Ticket("Ticket2"));
  });

  test("can find ticket", async () => {
    const found = await Context.ticketGateway.find("Ticket1");

    expect(found?.equals(found)).toBeTruthy();
  });

  test("can delete ticket", async () => {
    await Context.ticketGateway.delete("Ticket1");

    expect(await Context.ticketGateway.findAll()).toHaveLength(1);
  });
});
