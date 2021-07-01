import * as express from 'express'
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { CategoryController } from './../controllers/CategoryController';
import { SensorInfoController } from './../controllers/SensorInfoController';
import { SessionManagerController } from './../controllers/SessionManagerController';
import { TaskDailytimeController } from './../controllers/TaskDailytimeController';
import { PostController } from './../controllers/PostController';
import { SystemParamtersController } from './../controllers/SystemParamterController';
import { SensorsAssignToDevicesController } from './../controllers/SensorsAssignToDevicesController';
import { TempLogController } from './../controllers/TempLogController';
import { LastSensorValuesController } from './../controllers/LastSensorValuesController';
import { DeviceInfoController } from './../controllers/DeviceInfoController';
import { SP } from './../SP';
import { ServiceHttp } from './ServiceHttp';
import { GreenHouseController } from '../controllers/GreenHouseController';
import { MonitorListController } from '../controllers/MonitorListController';
import { ServiceLog } from './ServiceLog';

let compression = require('compression')
const https = require('https')
import { Server as ServerHttps_, createServer } from 'https'
import { Server } from 'typeorm';
const fs = require('fs');
var path = require("path")

function getFilename(x_url: string): string {
    if (x_url) {
        var m = x_url.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1) {
            return m[1];
        }
    }
    return "";
}
export class ServiceHttps_s {
    private app: express.Application;
    private serverhttpsobj: ServerHttps_;
   
    constructor() {
        this.app = express(); // your created express server
        //express.static.mime.define({'text/css': ['css']});
       // express.static.mime.define({'text/html': ['html']});
    
        /**
         * Setup routing-controllers to use typedi container.
         */
        useContainer(Container);
        this.app.disable('x-powered-by');
        //------------------------ gzip
        this.app.use(compression({ filter: this.shouldCompress }));

        useExpressServer(this.app, { // register created express server in routing-controllers
            controllers: [CategoryController,
                SensorInfoController,
                SessionManagerController,
                TaskDailytimeController,
                PostController,
                SystemParamtersController,
                SensorsAssignToDevicesController,
                TempLogController,
                GreenHouseController,
                LastSensorValuesController,
                MonitorListController,
                DeviceInfoController] // and configure it the way you need (controllers, validation, etc.)

        });


        //------------------------- SSL




    }


    requireLogin(req: any, res: any, next: any) {
        if (req.headers.cookie ==undefined || req.headers.cookie.indexOf("sid=") == -1) {
            res.redirect('/public/home/login');
        } else {
            next();
        }
    }
    shouldCompress(req: any, res: any) {
        /* if (req.headers['x-no-compression']) {
             // don't compress responses with this request header
             return false
         }*/
        if (req.originalUrl.indexOf("/public/home/res/") >= 0) {
            return compression.filter(req, res)
        } else if (req.originalUrl.indexOf("/home/res/") >= 0) {
            return compression.filter(req, res)
        }
        else if (req.originalUrl.indexOf("/home/views/") >= 0) {
            return compression.filter(req, res)
        }


        return false
    }
 

    public getServer(): ServerHttps_ {
        return this.serverhttpsobj;
      }

    private routes(): void {

        //------------------------- location
        // this.app.all('*', function(req: any, res: any, next: any) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
        //     next();
        //  });

        this.app.use("/public/home/res/node_modules/", express.static(path.join(__dirname, './../../node_modules'), { maxAge: "7d" }));
        this.app.use("/public/home/res/", express.static(path.join(__dirname, './../../files/res/public/'), { maxAge: "7d" }));
        this.app.use("/home/res/", express.static(path.join(__dirname, './../../files/res/'), { maxAge: "7d" }));
        this.app.use("/home/views/templates/", express.static(path.join(__dirname, './../../files/templates/views/templates'), { maxAge: "7d" }));

        this.app.use(function (req: any, res: any, next: any) {
            res.header('server', "jet-server");

            if (req.originalUrl.indexOf("/service/home") >= 0) {
                this.requireLogin(req, res, next);
            }else
             return next();

             // if(req.originalUrl.indexOf("/socket.io/socket.io.js")>=0) {
            //     res.writeHead(200);
            //     res.end();
             
            //  } 

        }); 
        


        this.app.get('/testserver', function (req: any, res: any) {
            res.send("test server -> ok");
        });

        this.app.get('/service/home/*', this.requireLogin, function (req: any, res: any) {
            res.send("ok");
        });

      
        this.app.get('/home/views/*', function (req: any, res: any) {

            let filename = getFilename(req.originalUrl);
            let t = path.join(__dirname + "./../../files/templates/views/", filename + ".html");
            res.sendFile(t);
        });
        this.app.get('/', this.requireLogin, function (req: any, res: any) {
            //res.send("test1");
            res.sendFile(path.join(__dirname, "./../../files/templates/views/" + 'index.html'));
            // res.redirect('/public/home/login');
        });
        this.app.get('/public/home/login', function (req: any, res: any) {
            //res.send("test222");
            res.sendFile(path.join(__dirname, "./../../files/templates/" + 'login.html'));
        });

        this.app.use(function (err: any, req: any, res: any, next: any) {
            if (err.name.indexOf("SQLITE_") >= 0) {
                console.error("qasem-> CATCH ALL DB ERROR ");
                console.error(err.name)
            }
        
        })
    }

    public async listen() {
        return new Promise((resolve, reject) => {
            this.routes();
            const httpsOptions = {
               key: fs.readFileSync(path.join(__dirname, './../../files/ssl/a.key')),
               cert: fs.readFileSync(path.join(__dirname, './../../files/ssl/a.crt')),
                defaultErrorHandler: true
            }
            //
         this.serverhttpsobj=  https.createServer(httpsOptions, this.app)
                .listen(SP.getObj().getSRVConfigFile.ServerHttpsPort, () => {
                    var tmp ='server https running at ' + SP.getObj().getSRVConfigFile.ServerHttpsPort;
                    var tmp ='\n server http running at ' + SP.getObj().getSRVConfigFile.ServerHttpPort;
                    ServiceLog.info(tmp);
                    console.log(tmp)
                    SP.Server_http_obj.listen(SP.getObj().getSRVConfigFile.ServerHttpPort);
                    return  resolve(true);
                });

        });
    }
}