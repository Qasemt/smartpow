import { Lock } from 'semaphore-async-await'//https://libraries.io/npm/semaphore-async-await
import * as net from "net";
import { SP } from '../SP';
import * as api from "../common/api";

export class ServiceSensorSimulation {

    private _lock: Lock;
    constructor() {
        this.run.bind(this);
    }
    public async init() {

        return true;

    }

    public sendPacket(ip: string, serial: number, code: number,
        val1: number,
        val2: number,
        val3: number,
        val4: number,
        val5: number,
        val6: number,
        sensor_type: number, model: number): void {
        var client = new net.Socket();
        client.connect(5050, ip, function () {
            let tt = "gggg";
            console.log('Connected');  // acknowledge socket connection
            //let t = "{\"sensor_cmd_any_data\":{\"sensor_serial\":${tt},\"sensor_code\":1,\"sensor_value1\":41,\"sensor_value2\":20,\"sensor_type\":3,\"sensor_model\":1}}";
            let t = '{"sensor_cmd_any_data":{"sensor_serial":' + serial +
                ',"sensor_code":' + code +
                ',"sensor_value1":' + val1 +
                ',"sensor_value2":' + val2 +
                ',"sensor_value3":' + val3 +
                ',"sensor_value4":' + val4 +
                ',"sensor_value5":' + val5 +
                ',"sensor_value6":' + val6 +
                ',"sensor_type":' + sensor_type +
                ',"sensor_model":' + model + '}}';
            client.write(t); // send info to Server
            client.destroy();
        });

    }
    public async run() {
        return new Promise((resolve, reject) => {
            var t = this;
            setInterval(function () {
                t.sendPacket("127.0.0.1", 1234, 22,(Math.random() * 50) - 20, Math.random() * 99,null,null,null,null,api.XGlobal.En_Sensor_Type.TEM_HUM, 1);
                t.sendPacket("127.0.0.1", 332244, 2,null,null,null,null,Math.random() * 100,null,api.XGlobal.En_Sensor_Type.LUX, 1);
                t.sendPacket("127.0.0.1", 123, 3,null,null,null,null,null,Math.random() * 100,api.XGlobal.En_Sensor_Type.CO2, 1);
            }, 4 * 1000);
            return resolve(true);
        });
    }


}