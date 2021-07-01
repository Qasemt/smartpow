import * as api from "../common/api";
export  class SessionInfo {
   
  public  m_lang: api.XGlobal.En_Language=api.XGlobal.En_Language.Persin;
  public  m_UserName: string;
  public  m_session_key:string;

    constructor(lang: api.XGlobal.En_Language,userName:string,session_key:string) {
        this.m_lang = lang;
        this.m_UserName = userName;
        this.m_session_key = session_key;
        
    }
}