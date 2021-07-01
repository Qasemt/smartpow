import { Service } from "typedi";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";
import { SystemParameter } from "../model/SystemParameter";

@Service()
export class SystemParameterRepository {

    private system_params_repo = getRepository(SystemParameter);

    async findAll() {

        SP.getObj().get_db_Lock();
        let result = Promise.resolve(this.system_params_repo.find());
        SP.getObj().get_db_release();

        return result;
        //return Promise.resolve(this.categories);
    }
     async  SaveOneRec(key1: number, val: string) {

        SP.getObj().get_db_Lock();

        const rec = await this.system_params_repo.findOne({ pkey: key1 });
        if(rec==null)
        return false;
        
        rec.pvalue = val;
        await this.system_params_repo.save(rec);
     
        SP.getObj().get_db_release()
        return true;
        //return Promise.resolve(this.categories);
    }
}