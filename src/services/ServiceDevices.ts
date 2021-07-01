import { DeviceInfo } from "../model/DeviceInfo";
import { DeviceInfoRepository } from "../repository/DeviceInfoRepository";
import { Lock } from "semaphore-async-await";
import { SP } from "../SP";
import { json } from "body-parser";
import { DeviceInfoEx } from "../model/DeviceInfoEx";


export class ServiceDevices {

    private m_lock: Lock;
    private _Repository: DeviceInfoRepository

    constructor() {
        this.m_lock = new Lock();

        // ServiceDevices.m_lock.acquire();
        // ServiceDevices.m_lock.release();
    }
    m_deviceEx_list: Array<DeviceInfoEx> = [];
    m_device_list: Array<DeviceInfo> = [];
    public continue_after_boot(): void {
        for (let entry of this.m_deviceEx_list) {
            entry.timeStop = SP.addSecs(entry.getModel.starttime, entry.getModel.durationtimesecs);
            if(entry.getModel.deviceenable===false || entry.getModel.powerstatus===false)
            {
                entry.getModel.starttime=0;
                entry.pwr_off_device();
                continue;
            }
            if (SP.UnixTime() < entry.timeStop) {
              

                entry.pwr_on_device();
            }else{
                entry.getModel.starttime=0;
                entry.pwr_off_device();
                continue;
            }

        }



    }
    public async init() {

        this._Repository = new DeviceInfoRepository();
        this.m_device_list = await this._Repository.findAll();
        for (let entry of this.m_device_list) {
            let item: DeviceInfoEx;
            item = new DeviceInfoEx();
            item.setDeviceInfo(entry);

            this.m_deviceEx_list.push(item);

        }

        this.continue_after_boot();
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        SP.getObj().getSRVSocketIo().getIO.on('connect', (socket: any) => {
            socket.on('device_cmd_enable_disable', (data: any) => {

                console.log('DEVICE DATA Arive => enable :' + data.enable + " | " + "Time :" + data.time_duration);
                //  this.enable_DisableDevice(data.deviceCode, data.time_duration_secs, data.enable);

            })

            // socket.on('device_cmd_get_power_status', (data: any) => {
            //   socket.emit("device_cmd_get_power_status",)
            // })
        });

    }
    public power_On_off_Device(d: number, start_time: number, time_duration_secs: number, v: boolean): void {
        for (let entry of this.m_deviceEx_list) {
            if (entry.getModel.code === d) {
                if (v == false) {
                    entry.pwr_off_device();
                } else {
                    entry.getModel.starttime = start_time;
                    entry.timeStop = SP.addSecs(entry.getModel.starttime, time_duration_secs);
                    entry.pwr_on_device();

                }

                break;
            }
        }
    }
    public updateValue(d: DeviceInfo) {
        for (let entry of this.m_deviceEx_list) {
            if (entry.getModel.code === d.code) {

                entry.setDeviceInfo(d);
                break;
            }
        }
    }
    public findDeviceEx(c: number): DeviceInfoEx {
        let obj: DeviceInfoEx;
        for (let entry of this.m_deviceEx_list) {
            if (entry.getModel.code === c) {

                obj = entry;
                break;
            }
        }
        return obj;
    }
    public run() {

        //-----------------------------------------
        for (let item_Ex of this.m_deviceEx_list) {
            item_Ex.enable_device();
        }
    }
}