

import { Lock } from 'semaphore-async-await'//https://libraries.io/npm/semaphore-async-await
import { Translator } from "./common/Translator"
import { SessionRepository } from './repository/SessionRepository';
import { Connection } from 'typeorm';
import { Server } from 'https';
import { Server as Server_HTTP } from 'http';
import { ServiceSocketIO } from "./services/ServiceSocketIO"
import { ServiceConfig } from "./services/ServiceConfig"
import { error } from 'util';
import { ServiceNRF } from './services/ServiceNRF';
import { ServiceDevices } from './services/ServiceDevices';
var Emittery = require('emittery');
import * as api from "./common/api";
import { ServiceSensorReaderNet } from './services/ServiceSensorReaderNet';
import { ServiceLog } from './services/ServiceLog';
import { ServiceHttp } from './services/ServiceHttp';
import { ServiceHttps_s } from './services/ServiceHttps';
import { ServiceSensorSimulation } from './services/ServiceSensorSimulation';


export class SP {

    public static _Emitter = new Emittery();
    private _Connection: Connection;

    private static _instance: SP = new SP();
    public static _CurrentOS: api.XGlobal.En_OS;
    public static Server_https_obj = new ServiceHttps_s();
    public static Server_http_obj = new ServiceHttp();

    private _lock: Lock;
    private _lock_socket_io: Lock;
    private _srv_socketIo: ServiceSocketIO;

    private _srv_logger: ServiceLog;
    private _srv_config: ServiceConfig;
    private _srv_nrf: ServiceNRF;
    private _srv_devices: ServiceDevices;
    private _srv_sensor_reader_net: ServiceSensorReaderNet;
    private _srv_SensorSimulation: ServiceSensorSimulation;


    private _score: number = 0;
    // private    db: sqlite3.Databas;
    constructor() {
        if (SP._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        SP._instance = this;
        SP.CheckOS();
        this._lock = new Lock();
        this._lock_socket_io = new Lock();

        this._srv_socketIo = new ServiceSocketIO();
        this._srv_config = new ServiceConfig();
        this._srv_nrf = new ServiceNRF();
        this._srv_devices = new ServiceDevices();
        this._srv_sensor_reader_net = new ServiceSensorReaderNet();
        this._srv_SensorSimulation = new ServiceSensorSimulation();
        this._srv_logger = new ServiceLog();


    }

    public setConnection(_c: Connection) {
        this._Connection = _c;
    }

    public getConnection() {
        return this._Connection;
    }
    public getSRVNRF(): ServiceNRF {
        return this._srv_nrf;
    }
    public getSRVDevices(): ServiceDevices {
        return this._srv_devices;
    }
    public getSRVSocketIo(): ServiceSocketIO {
        var o = undefined;
        this._lock_socket_io.acquire();
        o = this._srv_socketIo;
        this._lock_socket_io.release();
        return o;
    }
    public get getSRVConfigFile(): ServiceConfig {
        return this._srv_config;
    }

    public static getObj(): SP {
        return SP._instance;
    }
    public static UnixTime_to_Date(unix_Time: any): Date {
        return new Date(unix_Time * 1000);
    }
    public static UnixTime(): number {
        return Math.floor(Date.now() / 1000);
    }
    public static addSecs(xTime: number, secs: number): number {

        return xTime + (secs);
    }

    private static CheckOS(): void {
        if (/^win/.test(process.platform)) {
            this._CurrentOS = api.XGlobal.En_OS.Windows;
        } else {
            this._CurrentOS = api.XGlobal.En_OS.Linux;
        }
    }
    public async SP_Post_init() {
        if (this._srv_config.readConfig() == false)
            throw new Error("Can not read file config");
        return true;
    }
    public async SP_init() {



        await SessionRepository.init();
        await Translator.init();
        await this._srv_logger.init();
        //------
        await this._srv_socketIo.init();
        await this._srv_socketIo.run();
        //------
        await this._srv_nrf.NRFInit();
        //------
        await this._srv_devices.init();
        this._srv_devices.run();
        //------
        let r = await this._srv_sensor_reader_net.init();
        if (r == true) {
            // this._srv_sensor_reader_net.run();
            // this._srv_SensorSimulation.run();
        }
        return true;
    }

    public get_db_Lock(): void {
        this._lock.acquire();
    }
    public get_db_release(): void {
        this._lock.release();
    }





}