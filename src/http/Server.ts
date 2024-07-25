import express, {
  Express,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import http from "node:http";
import { Controller } from "../controllers/Controller";
import { Request } from "./Request";

export class Server {
  public port: number = 3000;
  public app: Express = express();
  private server: http.Server | null = null;

  addRoute(method: string, path: string, controller: Controller) {
    switch (method.toLowerCase()) {
      case "get": {
        this.app.get(
          path,
          async (req: ExpressRequest, res: ExpressResponse) => {
            const request = new Request();

            res.send(await controller.handle(request));
          }
        );
      }
      default: {
        break;
      }
    }
  }
  start(port: number) {
    this.port = port;
    if (!this.server) {
      this.server = this.app.listen(port);
    }
  }

  stop() {
    if (this.server) {
      this.server.close();
    }
  }
}
