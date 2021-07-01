import { JsonController, Get, Post as HttpPost, Param, Delete, Body, Res, Post, QueryParam, } from "routing-controllers";
import { Service } from "typedi";
import { SensorInfoRepository } from "../repository/SensorInfoRepository";
import { SensorInfo } from "../model/SensorInfo";
import { SP } from "../SP";
import { DbError } from "../common/MyStatus";

@Service()
@JsonController()
export class SensorInfoController {
    constructor(private m_repository: SensorInfoRepository) {
    }

    @Get("/service/home/sensorinfo/getlist")
    async  getAll( @Res() res: any) {
        return this.m_repository.findAll();
    }
    @Delete("/service/home/sensorinfo/delete_by_id")
    async  deleteById( @Res() res: any, @QueryParam("id") task_id: number) {
        //   SP.getObj().getSRVSocketIo().emitIO("home_refresh_msg","Deleted")
        return this.m_repository.deleteById(task_id);
    }

    @Post("/service/home/sensorinfo/insert_sensorinfo")
    async insert( @Res() res: any, @Body() x_model: SensorInfo) {

        x_model.createdAt = SP.UnixTime();
        x_model.updatedAt = x_model.createdAt;
        x_model.installPositionX = 0;
        x_model.installPositiony = 0;
        await this.m_repository.insert(x_model);

        return x_model;

    }

    @Post("/service/home/sensorinfo/update_sensorinfo")
    async  update( @Res() res: any, @Body() x_model: SensorInfo) {

        return this.m_repository.update(x_model);
    }

}