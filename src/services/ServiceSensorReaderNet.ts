
import * as socketIo from 'socket.io';
import { SP } from '../SP';
import * as api from "../common/api";
import * as net from "net";
import { Lock } from 'semaphore-async-await'//https://libraries.io/npm/semaphore-async-await
import { SensorLogRepository } from '../repository/SensorLogRepository';
import { SensorLogs } from '../model/SensorLogs';
import { ServiceLog } from './ServiceLog';

export class ServiceSensorReaderNet {
    private io: SocketIO.Server;
    private _lock: Lock;
    private m_SensorLogRepository: SensorLogRepository;


    public async init() {
        let port: number = SP.getObj().getSRVConfigFile.ServerSensorPort;
        let host: string = "127.0.0.1";
        let server = net.createServer(this.connect_socket.bind(this));
        this.m_SensorLogRepository = new SensorLogRepository();

        server.on('error', (e: any) => {
            if (e.code == 'EADDRINUSE') {
                console.log('Address in use, retrying...');

            }
        });
        server.listen(port, host, () => console.log(`running on ${host}:${port}`));


        return true;
    }

    public async connect_socket(socket: net.Socket) {
        let self: any;
        self = this;

        socket.on('data', async (data1) => {
            try {
                var obj_j = JSON.parse(data1.toString());
                obj_j.sensor_cmd_any_data.time_receive = SP.UnixTime()

                SP.getObj().getSRVSocketIo().emitIO("sensor_cmd_any_data", obj_j)
                //  console.log('DATA ' + socket.remoteAddress + ': ' + data);
                // Write the data back to the socket, the client will receive it as data from the server
                //  socket.write('You said "' + data + '"');
               // if (obj_j.sensor_cmd_any_data.sensor_type & api.XGlobal.En_Sensor_Type.TEM_HUM ) {
                    var sl: SensorLogs;
                    sl = new SensorLogs();

                    sl.updatedAt = obj_j.sensor_cmd_any_data.time_receive;
                    sl.createdAt = sl.updatedAt;
                    sl.sensorserial =obj_j.sensor_cmd_any_data.sensor_serial;
                    sl.sensorcode = obj_j.sensor_cmd_any_data.sensor_code;
                    sl.sensor_model = obj_j.sensor_cmd_any_data.sensor_model;;
                    sl.sensor_type = obj_j.sensor_cmd_any_data.sensor_type;
                   if(obj_j.sensor_cmd_any_data.sensor_value1 !=undefined)
                    sl.value1 = obj_j.sensor_cmd_any_data.sensor_value1.toFixed(2);
                    else sl.value1=null;

                    if(obj_j.sensor_cmd_any_data.sensor_value2 !=undefined)
                    sl.value2 = obj_j.sensor_cmd_any_data.sensor_value2.toFixed(2);
                    else sl.value2=null;

                    if(obj_j.sensor_cmd_any_data.sensor_value3 !=undefined)
                    sl.value3 = obj_j.sensor_cmd_any_data.sensor_value3.toFixed(2);
                    else sl.value3=null;

                    if(obj_j.sensor_cmd_any_data.sensor_value4 !=undefined)
                    sl.value4 = obj_j.sensor_cmd_any_data.sensor_value4.toFixed(2);
                    else sl.value4=null;

                    if(obj_j.sensor_cmd_any_data.sensor_value5 !=undefined)
                    sl.value5 = obj_j.sensor_cmd_any_data.sensor_value5.toFixed(2);
                    else sl.value5=null;

                    if(obj_j.sensor_cmd_any_data.sensor_value6 !=undefined)
                    sl.value6 = obj_j.sensor_cmd_any_data.sensor_value6.toFixed(2);
                    else sl.value6=null;


                    let res = await this.m_SensorLogRepository.saveLogs(sl);
               // }

            } catch (e) {
                e.data_arrive_from_sensor = data1.toString();
                ServiceLog.error(e);
            }
        });
        //   socket.pipe(socket);
    }
    public async run() {
    }

}