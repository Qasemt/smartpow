import { JsonController, Get, Post as HttpPost, Param, Delete, Body, Res, Post, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { TaskDailyTimeRepository } from "../repository/TaskDailyTimeRepository";
import { DailyTime } from "../model/Dailytime";
import { SP } from "../SP";

@Service()
@JsonController()
export class TaskDailytimeController {
    constructor(private m_taskDailyTimeRepository: TaskDailyTimeRepository) {
    }

    @Get("/service/home/taskdailytime/getlist")
    async  getAll( @Res() res: any) {
        return this.m_taskDailyTimeRepository.findAll();
    }
    @Delete("/service/home/taskdailytime/delete_by_id")
    async  deleteById( @Res() res: any, @QueryParam("id") task_id: number) {
        return this.m_taskDailyTimeRepository.deleteById(task_id);
    }

    @Post("/service/home/taskdailytime/insert_task_daily_time")
    async  insert( @Res() res: any, @Body() model_daily_time: DailyTime) {

        let m1: DailyTime = model_daily_time;
        m1.createdAt = SP.UnixTime();
        m1.updatedAt = SP.UnixTime();
        return this.m_taskDailyTimeRepository.insert(m1);
    }

    @Post("/service/home/taskdailytime/update_task_daily_time")
    async  update( @Res() res: any, @Body() model_daily_time: DailyTime) {
        return this.m_taskDailyTimeRepository.update(model_daily_time);
    }

}