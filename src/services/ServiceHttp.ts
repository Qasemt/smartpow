import { Server, createServer } from 'http'
import * as express from 'express'
import { Container } from "typedi";
import { SP } from '../SP';

export class ServiceHttp {
  private app: express.Application
  private server: Server

  constructor() {
    // initialize the new express instance
    this.app = express()
    // pass this express instance to the http server
    this.server = createServer(this.app)

    // instantiate routes
    this.routes()
  }

  private routes(): void {
    // tell the express instance to run this callback for each request
    this.app.use(function (req, res, next) {
      // check if it is a secure (https) request
      // if not redirect to the equivalent https url
        !req.secure ? res.redirect('https://' + req.hostname + req.url) : next();

    });
  }

  public getServer(): Server {
    return this.server;
  }
  public listen(port: number): void {
    // tell express instance to listen on given port
    this.server.listen(port)
  }
}