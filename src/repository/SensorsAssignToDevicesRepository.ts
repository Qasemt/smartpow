import { Service } from "typedi";
import { SensorsAssignToDevices } from "../model/SensorsAssignToDevices";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";
import { DbError } from "../common/MyStatus";

@Service()
export class SensorsAssignToDevicesRepository {

    private _Repository = getRepository(SensorsAssignToDevices);
    async findAll() {
        try {
            SP.getObj().get_db_Lock();
            let result = Promise.resolve(this._Repository.find());
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
    async update(x_model: SensorsAssignToDevices) {
        try {
            let updated_rec = await this._Repository.save(x_model);
            return updated_rec;
        } catch (e) {
            throw new DbError(null, e);
        }
    }

    async insert(x_model: SensorsAssignToDevices) {
        try {
            this._Repository.insert(x_model);
            return x_model;
        } catch (e) {
            throw new DbError(null, e);
        }
    }

    async addDefault() {
        let x1 = new SensorsAssignToDevices()
        x1.istaskactive = false;
        x1.deviceCode = 1;
        x1.sensitivesensor = 3;
        x1.sensorcode = 1010;
        x1.smsalert = false;
        x1.value1 = 1;
        x1.value2 = 2;
        x1.createdAt = SP.UnixTime();
        x1.updatedAt = SP.UnixTime();

        this.insert(x1)
        let x2 = new SensorsAssignToDevices()
        x2.istaskactive = false;
        x2.deviceCode = 2;
        x2.sensitivesensor = 4;
        x2.sensorcode = 1010;
        x2.smsalert = false;
        x2.value1 = 1;
        x2.value2 = 2;
        x2.createdAt = SP.UnixTime();
        x2.updatedAt = SP.UnixTime();

        this.insert(x2)
        let x3 = new SensorsAssignToDevices()
        x3.istaskactive = false;
        x3.deviceCode =44;
        x3.sensitivesensor = 1;
        x3.sensorcode = 1010;
        x3.smsalert = false;
        x3.value1 = 1;
        x3.value2 = 2;
        x3.createdAt = SP.UnixTime();
        x3.updatedAt = SP.UnixTime();
        this.insert(x3)
    }
}