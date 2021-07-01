
import * as socketIo from 'socket.io';
import { SP } from '../SP';
import { Lock } from 'semaphore-async-await'//https://libraries.io/npm/semaphore-async-await
var express = require('express');
var http = require('http');
import SocketIO  = require('socket.io');

export class ServiceSocketIO {
//    private io: SocketIO.Server;
    private _lock: Lock;
    public socket: SocketIO.Server;
    public async init() {

        //  var app = express();
        //  var server = http.createServer(app);
        this.socket = SocketIO.listen(SP.Server_http_obj.getServer());//
      
        // server.listen(80);
       // this.io = socketIo(SP.Server_HTTP);//SP.Server_HTTP
      //  this.io.origins('*:*');
        return true;
    }

    public async run() {
        //sourc sample :https://gist.github.com/alexpchin/3f257d0bb813e2c8c476

        this.socket.on('connect', (socket: any) => {
            console.log('Connected client ->' + socket.id);

            // socket.on('message', (msg: any) => {

            //     console.log('[server](message)--> %s ', JSON.stringify(msg));
            //     this.io.emit("message", msg); // Send message to sender
            //     //socket.broadcast.emit("message",msg); // Send message to everyone BUT sender

            // });

            socket.on('disconnect', () => {
                console.log('Client disconnected -> ' + socket.id);
                // if (this.io.sockets.connected[socket.id]) {
                //  }
            });
        });



    }
    public get getIO(): SocketIO.Server {
        // this._lock.acquire();
        return this.socket;
        //  this._lock.release();
    }
    public emitIO(evenName: string, data: any): boolean {
        if (evenName.length === 0) return false;

        this.socket.emit(evenName, data); // Send message to sender
        return true;
    }

}