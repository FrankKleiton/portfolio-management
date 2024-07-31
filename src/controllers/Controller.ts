import { Request } from "../http/Request";

export interface Controller {
  handle(request: Request): void;
}
