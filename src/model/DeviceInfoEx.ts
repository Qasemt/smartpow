import { DeviceInfo } from "./DeviceInfo";
import { SP } from "../SP";
import * as api from "../common/api";
//import { En_Sch_Mode } from "../common/api";
import { DeviceInfoRepository } from "../repository/DeviceInfoRepository";

export class DeviceInfoEx {

    private m: DeviceInfo;
    private m_time_end_work: number;
   // private m_time_start_work: number;
    private m_time_handel: any;
    private m_duration_time_minute: number;
    private  m_Repository: DeviceInfoRepository;
    constructor() {
        this.m_duration_time_minute = 0;
        this.m_time_end_work = 0;
        //this.m_time_start_work = 0;
        this.m_Repository = new DeviceInfoRepository();
        this.timer_check = this.timer_check.bind(this);

    }

    public getModelJson(): any {
        let f = {
            "device_code": this.m.code, "durationofminute": this.m_duration_time_minute,
            "powerstatus": this.m.powerstatus, "deviceenable": this.m.deviceenable, "time_start": this.getModel.starttime
        }
        return f;
    }
    public get getModel(): DeviceInfo {
        return this.m;
    }
    //----------------------------------------------
    public get timeStop(): number {
        return this.m_time_end_work;
    }
    // public get timeStart(): number {

    //     return this.m_time_start_work;
    // }
    public set durationTimeMinute(t: number) {
        this.m_duration_time_minute = t;
    }
    public set timeStop(t: number) {
        this.m_time_end_work = t;
    }
    // public set timeStart(t: number) {

    //     this.m_time_start_work = t;
    // }

    public setDeviceInfo(p: DeviceInfo): void {
        if(this.getModel!=undefined && this.getModel.schedulemode !=p.schedulemode)
        {
            this.pwr_off_device();
        }
        this.m = p;
    }

    public setScheduleMode(v: number) {
        this.m.schedulemode = v;
    }
    public async pwr_on_device() {
        this.m.powerstatus = true;
        this.m_time_handel = setInterval(this.timer_check, 1000);
        let r = await this.m_Repository.update(this.m);
        SP.getObj().getSRVSocketIo().emitIO("device_cmd_pwr_status", { "device_code": this.m.code, "pwr_status": this.m.powerstatus });
    }
    public async pwr_off_device() {
        this.m.powerstatus = false;
        clearInterval(this.m_time_handel);
        let r = await this.m_Repository.update(this.m);
        SP.getObj().getSRVSocketIo().emitIO("device_cmd_pwr_status", { "device_code": this.m.code, "pwr_status": this.m.powerstatus });
    }
    public enable_device() {
        if (this.m.deviceenable == false) return;

        console.log("RUN Device :" + this.m.title);
        SP.getObj().getSRVSocketIo().emitIO("device_cmd_enable_status", { "device_code": this.m.code, "device_enable": this.m.deviceenable });
    }
    public disable_device() {
        clearInterval(this.m_time_handel);

        SP.getObj().getSRVSocketIo().emitIO("device_cmd_enable_status", { "device_code": this.m.code, "device_enable": this.m.deviceenable });
    }
    public timer_check(): void {

        if (this.m.schedulemode === api.XGlobal.En_Sch_Mode.Manually) {
           
            //console.log("x1:"+SP.UnixTime_to_Date(n).toLocaleString() + "  "+ "x2:"+SP.UnixTime_to_Date(this.m_time_end_work).toLocaleString());
            if (SP.UnixTime()>this.m_time_end_work ||this.m.deviceenable==false) {
                this.pwr_off_device();

                return;
            }
        }
        console.log(this.m.title + " XXX");
    }
}