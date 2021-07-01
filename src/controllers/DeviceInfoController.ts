import { JsonController, Get, Post, Param, Delete, Body, Res, Put, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { DeviceInfoRepository } from "../repository/DeviceInfoRepository";
import { DeviceInfo } from "../model/DeviceInfo";
import { SP } from "../SP";

@Service()
@JsonController()
export class DeviceInfoController {

    constructor(private _Repository: DeviceInfoRepository) {
    }

    @Get("/service/home/deviceinfo/manually")
    async  setPwr(@Res() res: any
        , @QueryParam("code") code: number
        , @QueryParam("start_time") start_time: number
        , @QueryParam("duration_of_seconds") duration_of_seconds: number
        , @QueryParam("power_status") status: boolean) {
        // SP.getObj().getSRVSocketIo().emitIO("home_refresh_msg",x_model)
        SP.getObj().getSRVDevices().power_On_off_Device(code, start_time, duration_of_seconds, status);
        return true;
    }

    @Get("/service/home/deviceinfo/manually_last_status")
    async  getlaststatus(@Res() res: any, @QueryParam("devicecode") devicecode: number) {
        // SP.getObj().getSRVSocketIo().emitIO("home_refresh_msg",x_model)
        let x = SP.getObj().getSRVDevices().findDeviceEx(devicecode);
        if (x != undefined)
            return SP.getObj().getSRVDevices().findDeviceEx(devicecode).getModelJson();

        return x;
    }

    @Get("/service/home/deviceinfo/getlist")
    async  all(): Promise<DeviceInfo[]> {
        return await this._Repository.findAll();
    }

    @Put("/service/home/deviceinfo/")
    async  update(@Res() res: any, @Body() x_model: DeviceInfo) {
        SP.getObj().getSRVDevices().updateValue(x_model);
        let r = await this._Repository.update(x_model);
        SP.getObj().getSRVSocketIo().emitIO("home_refresh_msg", x_model)
        return r;
    }

    @Delete("/service/home/deviceinfo/delete_by_code")
    async  deleteByCode(@Res() res: any, @QueryParam("code") x_code: number) {

        return this._Repository.deleteByCode(x_code);
    }

    @Post("/service/home/deviceinfo/")
    async insert(@Res() res: any, @Body() x_model: DeviceInfo) {

        x_model.createdAt = SP.UnixTime();
        x_model.updatedAt = x_model.createdAt;
        await this._Repository.insert(x_model);

        return x_model;

    }



}