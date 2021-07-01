import { JsonController, Get, Post as HttpPost, Param, Delete, Body, Res, Post, QueryParam, } from "routing-controllers";
import { Service } from "typedi";
import { SensorLogRepository } from "../repository/SensorLogRepository";
import { SensorLogs } from "../model/SensorLogs";
import { SP } from "../SP";
import { DbError } from "../common/MyStatus";
import { isObject } from "util";

@Service()
@JsonController()
export class TempLogController {
    constructor(private m_repository: SensorLogRepository) {
    }

    // @Get("/service/home/templogs/getlist_by_code")
    // async  get_List_By_Code( @Res() res: any,
    //     @QueryParam("sensor_code") sensor_code: number,
    //     @QueryParam("number_of_read_logs") number_of_read_logs: number,
    //     @QueryParam("is_only_date") is_only_date: number) {

    //     return this.m_repository.getTempLogsListBySensorCode(sensor_code, number_of_read_logs);
    // }

    @Get("/service/home/templogs/getlist_by_code")
    async  get_List_By_code( @Res() res: any,
        @QueryParam("sensor_code") sensor_code: number,
        @QueryParam("number_of_read_logs") number_of_read_logs: number) {

            return this.m_repository.getTempLogsListBySensorCode(sensor_code, number_of_read_logs);
    }
    @Get("/service/home/templogs/getlist_by_time")
    async  get_List_By_time( @Res() res: any,
        @QueryParam("sensor_code") sensor_code: number,
        @QueryParam("sdate_unix") s_date_code: number,
        @QueryParam("edate_unix") e_date_code: number,
        @QueryParam("number_of_read_logs") number_of_read_logs: number,
        @QueryParam("is_only_date") is_only_date: boolean) {

            return this.m_repository.getTempLogsListByBetweenTime(sensor_code, number_of_read_logs,s_date_code,e_date_code,is_only_date);
    }
    

}