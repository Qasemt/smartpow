import { JsonController, Get, Post as HttpPost, Param, Delete, Body, Res, Post, QueryParam, } from "routing-controllers";
import { Service } from "typedi";
import { GreenHouseRepository } from "../repository/GreenHouseRepository";
import { GreenHouse } from "../model/GreenHouse";
import { SP } from "../SP";
import { DbError, UseInAnotherTable, TheRecordCannotBeDeleted } from "../common/MyStatus";

@Service()
@JsonController()
export class GreenHouseController {
    constructor(private m_repository: GreenHouseRepository) {
    }

    @Get("/service/home/greenhouse/getlist")
    async  getAll( @Res() res: any) {
        return this.m_repository.findAll();
    }
    @Delete("/service/home/greenhouse/delete_by_code")
    async  deleteById( @Res() res: any, @QueryParam("code") x_code: number) {
        try {
            if(x_code==1)
            throw new TheRecordCannotBeDeleted(null);

            let  res =await this.m_repository.isUseItem_BygreenHouseCode(x_code) ;
      
            if (res === true) {
                throw new UseInAnotherTable(null);
            }
            //   SP.getObj().getSRVSocketIo().emitIO("home_refresh_msg","Deleted")
            return this.m_repository.deleteById(x_code);
        } catch (e) {
            res.status(e.httpCode)
                .send({
                    name: e.name,
                    message: e.message,
                    stack: e.stack
                });

        }
    }

    @Post("/service/home/greenhouse/insert")
    async insert( @Res() res: any, @Body() x_model: GreenHouse) {

        x_model.createdAt = SP.UnixTime();
        x_model.updatedAt = x_model.createdAt;

        await this.m_repository.insert(x_model);

        return x_model;

    }

    @Post("/service/home/greenhouse/update")
    async  update( @Res() res: any, @Body() x_model: GreenHouse) {

        return this.m_repository.update(x_model);
    }

}