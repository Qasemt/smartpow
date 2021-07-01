import { Service } from "typedi";
import { SensorInfo } from "../model/SensorInfo";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";
import { DbError } from "../common/MyStatus";
import { GreenHouse } from "../model/GreenHouse";
import { MonitorListRepository } from "./MonitorListRepository";

@Service()
export class SensorInfoRepository {

    constructor(private m_monitor_repository: MonitorListRepository) {
    }
    private _Repository = getRepository(SensorInfo);
  
    async findAll() {
        try {
            SP.getObj().get_db_Lock();
            // let result = await this._Repository
            //     .createQueryBuilder("s")
            //     .select(["s.*"])
            //     .addSelect("g.title", "green_house_title")
            //     .leftJoin(GreenHouse, "g", "greenHouseCode = g.code").getRawMany();

           
             let result = await this._Repository
             .createQueryBuilder("sensor_infos")
             .leftJoinAndSelect("sensor_infos.greenHouse", "greenHouse").getMany();

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
        
            this.m_monitor_repository.deleteBySensorInfoId(x_id);
            
            SP.getObj().get_db_release();

            return true;
        } catch (e) {
            throw new DbError(null, e);
        }

    }
    async  update(x_model: SensorInfo) {
        try {
            let updated_rec = await this._Repository.save(x_model);
            return updated_rec;
        } catch (e) {
            throw new DbError(null, e);
        }
    }

    async  insert(x_model: SensorInfo) {
        try {
            return await this._Repository.insert(x_model);
        } catch (e) {
            throw new DbError(null, e);
        }

    }

    async  addDefualtSensorInfo() {
        try {

           let s1= new SensorInfo();
            s1.hasCO2=1; 
            s1.hasEC=1;
            s1.hasPH=0;
            s1.hashum=1;
            s1.haslux=1;
            s1.installPositionX=0;
            s1.installPositiony=0;
            s1.sensorcode=1010;
            s1.sensorserial=220202222;
            s1.title="سنسور A"
            s1.updatedAt=SP.UnixTime();
            s1.createdAt=SP.UnixTime();
            
            return await this._Repository.insert(s1);
        } catch (e) {
            throw new DbError(null, e);
        }

    }


}