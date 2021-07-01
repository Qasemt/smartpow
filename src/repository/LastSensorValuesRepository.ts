import { Service } from "typedi";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";

import { Lock } from 'semaphore-async-await'//https://libraries.io/npm/semaphore-async-await
import { LastSensorValues } from "../model/LastSensorValues";
import { DbError } from "../common/MyStatus";

@Service()
export class LastSensorValuesRepository {

    private _repository = getRepository(LastSensorValues);
    public async  findOneBySensorCode(pCode: number) {
        try {
            SP.getObj().get_db_Lock();
            let r: LastSensorValues;
            r = await this._repository.findOne({ sensorcode: pCode });
            if (r === null || r === undefined) {
                r = new LastSensorValues();
                r.id = 0;
                r.value1 =  NaN;
                r.value2 =NaN;
                r.value3 =NaN;
                r.value4 = NaN;
                r.updatedAt = 0;
                r.sensorserial = 0;
                r.sensorcode = 0;
                r.createdAt = 0;
                r.sensor_type =-1;
                r.sensor_model =-1;
            }


            SP.getObj().get_db_release()
            return r;
        } catch (e) {
            throw new DbError(null, e);
        }
    }
}