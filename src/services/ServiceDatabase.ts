
var path = require("path")
import { createConnection, Driver, Connection, ConnectionOptions } from "typeorm";

import { DeviceInfo } from "./../model/DeviceInfo";
import { DailyTime } from "./../model/Dailytime";
import { LastSensorValues } from "./../model/LastSensorValues";
import { SensorInfo } from "./../model/SensorInfo";
import { SensorsAssignToDevices } from "./../model/SensorsAssignToDevices";
import { SystemParameter } from "./../model/SystemParameter";
import { SensorLogs } from "./../model/SensorLogs";
import { Profile } from "./../model/Profile";
import { SP } from "../SP";
import { GreenHouse } from "../model/GreenHouse";
import { GreenHouseRepository } from "../repository/GreenHouseRepository";
import { MonitorList } from "../model/MonitorList";
import { toUnicode } from "punycode";
import { ProfileRepository } from "../repository/ProfileRepository";
import { SensorInfoRepository } from "../repository/SensorInfoRepository";
import { MonitorListRepository } from "../repository/MonitorListRepository";
import { DeviceInfoRepository } from "../repository/DeviceInfoRepository";
import { SensorsAssignToDevicesRepository } from "../repository/SensorsAssignToDevicesRepository";

export class ServiceDatabase {

    constructor() {

    }

    private async first_init() {
        if (SP.getObj().getSRVConfigFile.first_init === false) {
            try {
                var x_green_house = new GreenHouse();
                x_green_house.code = 1;
                x_green_house.createdAt = SP.UnixTime();
                x_green_house.updatedAt = SP.UnixTime();
                x_green_house.description = "";
                x_green_house.title = "Green House 1";
                var rp_green_house = new GreenHouseRepository();

                rp_green_house.insert(x_green_house);
                //==================================================
                let t1 = new DeviceInfoRepository()
                t1.addDefualtDevice(x_green_house)
                //==================================================
                let pr = new ProfileRepository();
                pr.addDefualtAdmin();
                //==================================================
                let m = new MonitorListRepository()
                let p = new SensorInfoRepository(m);
                p.addDefualtSensorInfo()
                //==================================================
                let x = new SensorsAssignToDevicesRepository()
                x.addDefault()
                //==================================================
                SP.getObj().getSRVConfigFile.first_init = true;
                SP.getObj().getSRVConfigFile.writeConfig();

            } catch (e) {
                console.log(e.message)
                return false
            } finally {
                return true
            }
        }
    }
    public async run() {
        return new Promise((resolve, reject) => {


            // const options: ConnectionOptions = {
            //     type: "sqlite",
            //     //database: path.join(__dirname, "./../../data/sqlitedb.db"),
            //     database:"d:\\rr.db",
            //     logging: true,
            //  //   logging: ["error",'query'],//"query"
            //    // synchronize: true,
            //     entities: [GreenHouse,DeviceInfo ,SensorsAssignToDevices,MonitorList,SensorLogs ,DailyTime, LastSensorValues, SensorInfo, Profile, SystemParameter]
            // };

            // const options: ConnectionOptions = {
            //     type: "mariadb",
            //     host: "localhost",
            //     port: 3307,
            //     username: "root",
            //     password: "",
            //     database: "smartdb",
            //     logging: ["error"],//"query"
            //     synchronize: true,
            //     entities: [GreenHouse,DeviceInfo ,SensorsAssignToDevices,MonitorList,SensorLogs ,DailyTime, LastSensorValues, SensorInfo, Profile, SystemParameter]
            // };

            const options: ConnectionOptions = {
                type: "postgres",
                host: process.env.PG_REMOTE,
                port: Number(process.env.PG_PORT),
                username: process.env.PG_USER,
                password: process.env.PG_PASS,
                database: process.env.PG_DB,
                logging: ["error"],//"query"
                synchronize: true,
                entities: [GreenHouse, DeviceInfo, SensorsAssignToDevices, MonitorList, SensorLogs, DailyTime, LastSensorValues, SensorInfo, Profile, SystemParameter]
            };

            createConnection(options)
                .then(async (connection) => {
                    console.log(`Connected Created ${connection}`);
                    SP.getObj().setConnection(connection);
                    this.first_init();
                    return resolve(true);
                })
                .catch(async (error) => {
                    console.error(`Connection Error ${JSON.stringify(error)}`);
                    return resolve(false);
                });
        });




    }
}