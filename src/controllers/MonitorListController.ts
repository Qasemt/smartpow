import { JsonController, Get, Post as HttpPost, Param, Delete, Body, Res, Post, QueryParam, } from "routing-controllers";
import { Service } from "typedi";
import { MonitorListRepository } from "../repository/MonitorListRepository";
import { MonitorList } from "../model/MonitorList";
import { SP } from "../SP";
import { DbError, UseInAnotherTable, TheRecordCannotBeDeleted } from "../common/MyStatus";

@Service()
@JsonController()
export class MonitorListController {
    constructor(private m_repository: MonitorListRepository) {
    }

    @Get("/service/home/monitorlist/getlist")
    async  getAll( @Res() res: any) {
        return this.m_repository.findAll();
    }
    @Delete("/service/home/monitorlist/delete_by_id")
    async  deleteById( @Res() res: any, @QueryParam("id") x_id: number) {
        try {
      
            if (res === true) {
                throw new UseInAnotherTable(null);
            }
            //   SP.getObj().getSRVSocketIo().emitIO("home_refresh_msg","Deleted")
            return this.m_repository.deleteById(x_id);
        } catch (e) {
            res.status(e.httpCode)
                .send({
                    name: e.name,
                    message: e.message,
                    stack: e.stack
                });

        }
    }

    @Post("/service/home/monitorlist/insert")
    async insert( @Res() res: any, @Body() x_model: MonitorList) {

        x_model.createdAt = SP.UnixTime();
        x_model.updatedAt = x_model.createdAt;

        await this.m_repository.insert(x_model);

        return x_model;

    }

    @Post("/service/home/monitorlist/update")
    async  update( @Res() res: any, @Body() x_model: MonitorList) {

        return this.m_repository.update(x_model);
    }

}