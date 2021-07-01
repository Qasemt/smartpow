import { Service } from "typedi";
import { GreenHouse } from "../model/GreenHouse";
import { SensorInfo } from "../model/SensorInfo";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";
import { DbError, UseInAnotherTable } from "../common/MyStatus";

@Service()
export class GreenHouseRepository {

    private _Repository = getRepository(GreenHouse);
    private _Repository_SensorInfo = getRepository(SensorInfo);
    async findAll() {
        try {
            SP.getObj().get_db_Lock();
            let result = Promise.resolve(this._Repository.find());
            SP.getObj().get_db_release();

            return result;
        } catch (e) {
            throw new DbError(null, e);
        }
    } async isUseItem_BygreenHouseCode(x_code: number) {

        try {
            SP.getObj().get_db_Lock();

            //let result = await this._Repository_SensorInfo.count({ greenHouseCode: x_code });

            SP.getObj().get_db_release();

            // if (result > 0)
            return true;
        } catch (e) {
            throw new DbError(null, e);
        }

       // return false;

    }
    async deleteById(x_code: number) {

        try {
            SP.getObj().get_db_Lock();

            let result = await this._Repository.delete({ code: x_code });
            SP.getObj().get_db_release();

            return true;
        } catch (e) {
            throw new DbError(null, e);
        }

    }
    async  update(x_model: GreenHouse) {
        try {
            let updated_rec = await this._Repository.save(x_model);
            return updated_rec;
        } catch (e) {
            throw new DbError(null, e);
        }
    }

    async  insert(x_model: GreenHouse) {
        try {
            return await this._Repository.insert(x_model);
        } catch (e) {
            throw new DbError(null, e);
        }

    }

}