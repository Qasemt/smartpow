import { JsonController, Get, Post as HttpPost, Param, Delete, Body, Res, Post, QueryParam, } from "routing-controllers";
import { Service } from "typedi";
import { SensorsAssignToDevicesRepository } from "../repository/SensorsAssignToDevicesRepository";
import { SensorsAssignToDevices } from "../model/SensorsAssignToDevices";
import { SP } from "../SP";
import { DbError } from "../common/MyStatus";

@Service()
@JsonController()
export class SensorsAssignToDevicesController {
    constructor(private m_repository: SensorsAssignToDevicesRepository) {
    }

    @Get("/service/home/sensors_asig_to_devs/getlist")
    async  getAll( @Res() res: any) {
        return this.m_repository.findAll();
    }
    @Get("/service/home/sensors_asig_to_devs/delete_by_id")
    async  deleteById( @Res() res: any, @QueryParam("id") task_id: number) {
        return this.m_repository.deleteById(task_id);
    }

    @Post("/service/home/sensors_asig_to_devs/insert_sensors_assign_to_devices")
    async insert( @Res() res: any, @Body() x_model: SensorsAssignToDevices) {

        x_model.createdAt = SP.UnixTime();
        x_model.updatedAt = x_model.createdAt;

        await this.m_repository.insert(x_model);
        return x_model;

    }

    @Post("/service/home/sensors_asig_to_devs/update_sensors_assign_to_devices")
    async  update( @Res() res: any, @Body() x_model: SensorsAssignToDevices) {
        return this.m_repository.update(x_model);
    }

}