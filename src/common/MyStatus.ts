import * as api from "../common/api";
import { HttpError, HttpCode } from "routing-controllers";
import { SessionInfo } from "./SessionInfo";
import { Translator } from "./Translator";
import { isNull } from "util";
import { x1 } from "../common/api";
import { DailyTime } from "../model/Dailytime";

export class ValidationError extends Error {
    name = "ValidationError";
    message = "Validation Error!";
    errors = [
        "blank",
        "minLength",
        "maxLength",
    ];
}

export class BaseHttpError extends HttpError {

    private m_session: SessionInfo;

    private m_lang: api.XGlobal.En_Language = api.XGlobal.En_Language.Persin;
    private m_stack: string;

    //taheri : in type Basehttperror dar onundefine estefade nashavad/
    constructor(s: SessionInfo, httpCode: number, key_name: string, base_error: any = null) {
        super(httpCode);

        this.m_session = s;

        if (isNull(this.m_session) === false) {
            this.m_lang = s.m_lang;
        }

        this.name = key_name;
        if (key_name != undefined && key_name.indexOf("SQLITE_") >= 0) {
            let databae_error_name = Translator.doTranslate("Database_Error", this.m_lang) + "[" + key_name + "]";
            this.message = databae_error_name
            this.m_stack = base_error.stack;
        } else if (key_name != undefined && key_name.indexOf("ER_") >= 0) // mariadb error
        {
            let databae_error_name = Translator.doTranslate("Database_Error", this.m_lang) + " : " + Translator.doTranslate(key_name, this.m_lang)+ "  [" + key_name + "]" ;
             
            this.message = databae_error_name
            if(base_error!=null)
            this.m_stack = base_error.stack;
        }
        else {
            this.message = Translator.doTranslate(key_name, this.m_lang);
        }

    }

}


export class UserNotFoundError extends BaseHttpError {

    constructor(s: SessionInfo = null) {
        super(s, 404, "User_not_found");
    }

}
export class DbError extends BaseHttpError {

    constructor(s: SessionInfo = null, base_error: any) {
        super(s, 500, base_error.code, base_error);
    }

}
export class InvalidPasswordAndUsernameError extends BaseHttpError {

    constructor(s: SessionInfo = null) {
        super(s, 500, "Invalid_password_or_username");
    }

}
export class UseInAnotherTable extends BaseHttpError {

    constructor(s: SessionInfo = null) {
        super(s, 500, "USE_IN_ANOTHER_TABLE");
    }

}
export class TheRecordCannotBeDeleted extends BaseHttpError {

    constructor(s: SessionInfo = null) {
        super(s, 500, "THE_RECORD_CANNOT_BE_DELETED");
    }

}
export class Not_FoundError extends BaseHttpError {

    constructor(s: SessionInfo) {
        super(s, 404, "not_found");
    }
}
export class THE_RECORD_ALREADY_EXISTS extends BaseHttpError {

    constructor(s: SessionInfo) {
        super(s, 500, "THE_RECORD_ALREADY_EXISTS");
    }
}


