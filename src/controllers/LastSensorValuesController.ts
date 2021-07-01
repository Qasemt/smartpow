import { JsonController, Get, Post as HttpPost, Param, Delete, Body, Res, Post, QueryParam, } from "routing-controllers";
import { Service } from "typedi";
import { LastSensorValuesRepository } from "../repository/LastSensorValuesRepository";
import { SensorLogs } from "../model/SensorLogs";
import { SP } from "../SP";
import { DbError } from "../common/MyStatus";
import { isObject } from "util";
import { LastSensorValues } from "../model/LastSensorValues";

@Service()
@JsonController()
export class LastSensorValuesController {
    constructor(private m_repository: LastSensorValuesRepository) {
    }

    @Get("/service/home/last_sensor_values/find")
    async  getLastValueSensorByCode( @Res() res: any,
        @QueryParam("sensor_code") sensor_code: number,
    ) {
        let v = await this.m_repository.findOneBySensorCode(sensor_code);
        return v;
    }



}