import { Service } from "typedi";
import { SP } from "./../SP";
import { EntityRepository, getRepository } from "typeorm";
import { SessionInfo } from "../common/SessionInfo";

import { Lock } from 'semaphore-async-await'//https://libraries.io/npm/semaphore-async-await
import { Profile } from "../model/Profile";
import { DbError } from "../common/MyStatus";

@Service()
export class ProfileRepository {

    private profile_repo = getRepository(Profile);
    public async findOneByUserName(user_name: string, password: string) {
        try {
            SP.getObj().get_db_Lock();
            let r = this.profile_repo.findOne({ userName: user_name, pass: password });
            SP.getObj().get_db_release()
            return r;
        } catch (e) {
            throw new DbError(null, e);
        }
    }


    public async addDefualtAdmin() {
        try {
           
            let p = new Profile()
            p.code = 1;
            p.name = "admin";
            p.lastName = "admin";
            p.userName = "admin";
            p.pass = "1234";
            p.mobile = "09000001";
            p.userType = 1;
            p.memberOf = "admins";
            p.isGroup = true;
            p.isRTL = true;
            p.langId = true;
            p.createdAt = SP.UnixTime();
            p.updatedAt = SP.UnixTime();

            return await      this.profile_repo.insert(p);
        }
          
     catch(e) {
        throw new DbError(null, e);
    }
}
}