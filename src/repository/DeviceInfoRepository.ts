import { Service } from "typedi";
import { DeviceInfo } from "../model/DeviceInfo";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";
import { DbError } from "../common/MyStatus";
import { GreenHouse } from "../model/GreenHouse";

@Service()
export class DeviceInfoRepository {

    constructor() {
    }
    private _Repository = getRepository(DeviceInfo);
    public async findAll() {
        try {
            SP.getObj().get_db_Lock();
            // let result = Promise.resolve(this._Repository.find());


            let result = await this._Repository
                .createQueryBuilder("device_info")
                .leftJoinAndSelect("device_info.greenHouse", "greenHouse").getMany();

            // let result = await this._Repository
            //     .createQueryBuilder("device_info")
            //     .leftJoinAndMapOne("device_info.greenHouse", GreenHouse, "greenHouse", "device_info.green_house_code == greenHouse.code")
            //     .getMany();


            SP.getObj().get_db_release();

            return result;
            //return Promise.resolve(this.categories);
        } catch (e) {
            throw new DbError(null, e);
        }
    }
    public async update(x_model: DeviceInfo) {
        try {

            //x_model.green_house_code = x_model.greenHouse.code;
            let updated_rec = await this._Repository.save(x_model);
            return updated_rec;

        } catch (e) {
            throw new DbError(null, e);
        }
    }

    async insert(x_model: DeviceInfo) {
        try {
            return await this._Repository.insert(x_model);
        } catch (e) {
            throw new DbError(null, e);
        }

    }
    async deleteByCode(x_code: number) {
        try {
            SP.getObj().get_db_Lock();
            let result = await this._Repository.delete({ code: x_code });
            SP.getObj().get_db_release();

            return true;
        } catch (e) {
            throw new DbError(null, e);
        }

    }


    async addDefualtDevice(g:GreenHouse) {
        try {

            let s1 = new DeviceInfo(1, "فن شمالی", false, 1, true, false)
            s1.greenHouse=g;
            s1.updatedAt = SP.UnixTime();
            s1.createdAt = SP.UnixTime();

             await this._Repository.insert(s1);

             let s2 = new DeviceInfo(2, "فن جنوبی", false, 1, true, false)
             s2.greenHouse=g;
             s2.updatedAt = SP.UnixTime();
             s2.createdAt = SP.UnixTime();
 
              await this._Repository.insert(s2);


              let s3 = new DeviceInfo(44, "گرمایش 1", false, 1, true, false)
              s3.greenHouse=g;
              s3.updatedAt = SP.UnixTime();
              s3.createdAt = SP.UnixTime();
  
               await this._Repository.insert(s3);
        } catch (e) {
            throw new DbError(null, e);
        }

    }



}