import { Service } from "typedi";
import { MonitorList } from "../model/MonitorList";
import { SensorInfo } from "../model/SensorInfo";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";
import { DbError, UseInAnotherTable, THE_RECORD_ALREADY_EXISTS } from "../common/MyStatus";

@Service()
export class MonitorListRepository {

    private _Repository = getRepository(MonitorList);
    private _Repository_SensorInfo = getRepository(SensorInfo);
    async findAll() {
        try {
            SP.getObj().get_db_Lock();
          //  let result = await Promise.resolve(this._Repository.find());
          //  let result_sensorinfos = await Promise.resolve(this._Repository_SensorInfo.find());
         
            let result = await this._Repository
            .createQueryBuilder("monitors")
            .leftJoinAndSelect("monitors._sensorInfo", "_sensorInfo").getMany();

            result.forEach((item: MonitorList, index) => {

                // result_sensorinfos.forEach((item_sensor: SensorInfo, index) => {

                //     if (item._sensorInfo.id == item_sensor.id) {
                //         if (item_sensor.title == undefined) item_sensor.title = "_";
                //         item.sensorserial = 0;
                //         item.sensorname = item_sensor.title;
                //         item.sensorserial = item_sensor.sensorserial;
                //         item.sensorcode = item_sensor.sensorcode;
                //     }
                // });


            });




            SP.getObj().get_db_release();

            return result;
        } catch (e) {
            throw new DbError(null, e);
        }
    }

    async deleteById(x_id: number) {

        try {
            SP.getObj().get_db_Lock();

            let result = await this._Repository.delete({ id: x_id });
            SP.getObj().get_db_release();

            return true;
        } catch (e) {
            throw new DbError(null, e);
        }

    }
    async deleteBySensorInfoId(p_sensor_info_id: number) {

        try {
            SP.getObj().get_db_Lock();

            let result = await this._Repository.createQueryBuilder()
            .delete()
            .where("sensorinfo_id = :1")
            .setParameters({ 1: p_sensor_info_id })
            .execute();
            SP.getObj().get_db_release();

            return true;
        } catch (e) {
            throw new DbError(null, e);
        }
        
        

    }
    async  update(x_model: MonitorList) {
        try {
            let updated_rec = await this._Repository.save(x_model);
            return updated_rec;
        } catch (e) {
            throw new DbError(null, e);
        }
    }
    async checkExist(p_sensro_type: number, p_sensor_id: number) {
        const obj = await this._Repository.createQueryBuilder()
            .where("SensorInfoId = :1")
            .andWhere("sensortype = :2")
            .select('COUNT(`SensorInfoId`)', 'count')
            .setParameters({ 1: p_sensor_id, 2: p_sensro_type }).getRawOne()
        return obj.count;
    }
    async  insert(x_model: MonitorList) {
        let c = await this.checkExist(x_model.sensortype, x_model._sensorInfo.id);

        if (c > 0)
            throw new THE_RECORD_ALREADY_EXISTS(null);
            
        try {
         

            if (c == 0) {
                let m = new MonitorList(x_model.sensortype);

                 m.createdAt = x_model.createdAt;
                 m.updatedAt = x_model.updatedAt;
                 m._sensorInfo=x_model._sensorInfo;
                
                return await this._Repository.insert(m);
            }

        } catch (e) {
            throw new DbError(null, e);
        }

    }

}