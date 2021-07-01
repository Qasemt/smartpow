import { Service } from "typedi";
import { DailyTime } from "../model/Dailytime";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";

@Service()
export class TaskDailyTimeRepository {

    private _Repository = getRepository(DailyTime);
    async findAll() {

        SP.getObj().get_db_Lock();
        let result = Promise.resolve(this._Repository.find());
        SP.getObj().get_db_release();

        return result;

    }

    async deleteById(x_id: number) {

        SP.getObj().get_db_Lock();
        let result = await this._Repository.delete({ id: x_id });
        SP.getObj().get_db_release();

        return true;

    }
    async  update(x_model: DailyTime) {

        let updated_rec = await this._Repository.save(x_model);
        return updated_rec;
    }

    async  insert(x_model: DailyTime) {
        this._Repository.insert(x_model);
        return x_model;
    }

}