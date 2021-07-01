import { Service } from "typedi";
import { Dictionary } from "./../common/Dictionary";
import { SessionInfo } from "../common/SessionInfo";
import { Lock } from 'semaphore-async-await'//https://libraries.io/npm/semaphore-async-await

@Service()
export class SessionRepository {

    private static session_list: Dictionary<string, SessionInfo> = new Dictionary<string, SessionInfo>();
    private static m_lock: Lock;
    public static async init() {
        SessionRepository.m_lock = new Lock();
    }
    findAll() {

        SessionRepository.m_lock.acquire();
        let t = Promise.resolve(SessionRepository.session_list);
        SessionRepository.m_lock.release();
        return t;
    }

    public static findOne(key: string) {
        SessionRepository.m_lock.acquire();
        let s = SessionRepository.session_list.getValue(key);
        SessionRepository.m_lock.release();
        return s;
    }
    public static findOneByUsrName(user_name: string):SessionInfo {
        let s:SessionInfo=null;
        SessionRepository.m_lock.acquire();
        for (let item of SessionRepository.session_list.values())
        {
            if(item.m_UserName===user_name)
            {
                s = item;
            }
        }
        
        SessionRepository.m_lock.release();
        return s;
    }

    public static save(key: string, session_info: SessionInfo) {
        SessionRepository.m_lock.acquire();
      
       // SessionRepository.session_list.
        SessionRepository.session_list.add(key, session_info);
        SessionRepository.m_lock.release();
        return session_info;
    }

    public static remove(key: string) {
        SessionRepository.m_lock.acquire();
        let res = SessionRepository.session_list.remove(key);
        SessionRepository.m_lock.release();
        return res;
    }

}