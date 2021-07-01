import { Service } from "typedi";
import { SensorLogs } from "../model/SensorLogs";
import { Category } from "../model/Category";
import { SP } from "../SP";
import { EntityRepository, getRepository } from "typeorm";
import { DbError } from "../common/MyStatus";

@Service()
export class SensorLogRepository {

    private m_Repository = getRepository(SensorLogs);
    // async findAll() {

    //     SP.getInstance().get_db_Lock();
    //     let result = Promise.resolve(this.tmplog_Repository.find());
    //     SP.getInstance().get_db_release();

    //     return result;
    //     //return Promise.resolve(this.categories);
    // }
    async getTempLogsListBySensorCode(p_sensor_code: number, p_number_of_rec_read: number) {
        SP.getObj().get_db_Lock();

        // const q0 =    await SP.getInstance().getConnection().query("SELECT * FROM (SELECT * FROM temp_logs WHERE \
        //     sensorcode =$1 ORDER BY updatedAt Desc limit $2) ORDER BY  updatedAt",[p_sensor_code,p_number_of_rec_read]);
        //-----------------------------------------------------------------------------
        try {
            const q1 = await SP.getObj().getConnection().getRepository(SensorLogs).createQueryBuilder("d")
                .select("*")
                .where("sensorcode = :1")
                .setParameters({ 1: p_sensor_code })
                .take(p_number_of_rec_read)
                .orderBy("d.updatedAt", "DESC")
                .limit(p_number_of_rec_read);

            const q2 = await q1.createQueryBuilder()

                .from("(" + q1.getQuery() + ")", "d")
                .select("*")
                .setParameters(q1.getParameters())
                .orderBy("d.updatedAt")
                .getRawMany();

            let result = Promise.resolve(q2);

            SP.getObj().get_db_release();
            return result;
        } catch (e) {
            throw new DbError(null, e);
        }
    }

    async getTempLogsListByBetweenTime(p_sensor_code: number
        , p_number_of_rec_read: number
        , p_stime_unix: number
        , p_etime_unix: number
        , is_only_date: boolean) {

        SP.getObj().get_db_Lock();

        try {
            let query_str: string = "";
            let query1: any;
            if (is_only_date) {
                //     query_str = "SELECT * FROM temp_logs WHERE sensorcode = $1 AND updatedAt >= date($2) \
                //   AND updatedAt <= date($3)  ORDER BY updatedAt Desc limit $4 ";
                //   query1 = await SP.getObj().getConnection().query(query_str, [p_sensor_code, p_stime_unix, p_etime_unix, p_number_of_rec_read]);
            }
            else {
                query_str = "SELECT * FROM sensor_logs WHERE sensorcode = $1 AND updatedAt >= datetime($2) \
             AND updatedAt <= datetime($3)  ORDER BY updatedAt Desc limit $4 ";
                // query1 = await SP.getObj().getConnection().query(query_str, [p_sensor_code, p_stime_unix, p_etime_unix, p_number_of_rec_read]);
                query1 = await SP.getObj().getConnection()
                    .createQueryBuilder()
                    .select()
                    .from(SensorLogs, "t")
                    .where("t.sensorcode = :code and t.sensorcode = :code and t.updatedAt >= :s_time and  t.updatedAt <= :e_time")
                    .orderBy("t.updatedAt", "ASC")
                    .take(p_number_of_rec_read)
                    .setParameters({ code: p_sensor_code, s_time: p_stime_unix, e_time: p_etime_unix })

            }


            //console.log(q2.getSql())
            let result = Promise.resolve(query1.getRawMany());


            SP.getObj().get_db_release();
            return result;
        } catch (e) {
            throw new DbError(null, e);
        }
    }
    async saveLogs(x_model: SensorLogs) {
        try {
            let updated_rec = await this.m_Repository.save(x_model);
            return updated_rec;
        } catch (e) {
            throw new DbError(null, e);
        }
    }
}