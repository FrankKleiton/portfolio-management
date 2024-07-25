import { Request } from "../http/Request";
import { Response } from "../http/Response";

export interface Controller {
  handle(request: Request): void;
}
